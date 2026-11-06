import { PURCHASE_LIFETIME_MS } from '@/constants/Purchases'
import { enqueueWrite, getDatabase } from '@/database/connection'
import { insertPurchase } from '@/database/queries'
import type { ArrayCart, History, Product } from '@/interfaces/ItemsInterfaces'

type PurchaseRow = {
  id: number
  date: string
  hour: string
  final_price: number
  expires_at: number
}

type PurchaseItemRow = {
  purchase_id: number
  product_id: number
  name: string
  quantity: number
  price: number
}

const toProduct = (row: PurchaseItemRow): Product => ({
  id: row.product_id,
  name: row.name,
  quantity: row.quantity,
  price: row.price,
})

const groupItemsByPurchase = (rows: PurchaseItemRow[]) => {
  const itemsByPurchase = new Map<number, Product[]>()
  for (const row of rows) {
    const items = itemsByPurchase.get(row.purchase_id)
    if (items) items.push(toProduct(row))
    else itemsByPurchase.set(row.purchase_id, [toProduct(row)])
  }
  return itemsByPurchase
}

// Elimina del celular únicamente las compras vencidas; sus productos caen en cascada.
export const purgeExpiredData = async () => {
  try {
    await enqueueWrite((db) =>
      db.runAsync('DELETE FROM purchases WHERE expires_at <= ?', Date.now())
    )
  } catch (e) {
    console.log("No se pudo purgar el historial \n", e)
  }
}

export const storeData = async (cart: ArrayCart) => {
  const date = new Date().toLocaleDateString('es-AR', {day: '2-digit', month: '2-digit'})
  const hour = new Date().toLocaleTimeString('es-AR', {hour: '2-digit', minute: '2-digit'})
  const dataExpire = Date.now() + PURCHASE_LIFETIME_MS
  try{
    // Al guardar aprovechamos para descartar las compras ya vencidas.
    await purgeExpiredData()

    // En transacción: nunca queda una compra sin parte de sus productos.
    await enqueueWrite((db) =>
      db.withTransactionAsync(() =>
        insertPurchase(db, { date, hour, finalPrice: cart.finalPrice, dataExpire, items: cart.items })
      )
    )
  } catch (e){
    console.log("No se guardo \n", e)
  }
}

export const getData = async (): Promise<History[]> => {
  // Leer el historial ya descarta de paso las compras vencidas.
  await purgeExpiredData()
  try {
    const db = await getDatabase()
    // Tras la purga solo quedan productos de compras vigentes: no hace falta un join.
    const [purchases, itemRows] = await Promise.all([
      db.getAllAsync<PurchaseRow>('SELECT * FROM purchases ORDER BY id'),
      db.getAllAsync<PurchaseItemRow>('SELECT * FROM purchase_items ORDER BY id'),
    ])
    const itemsByPurchase = groupItemsByPurchase(itemRows)

    return purchases.map((purchase) => ({
      id: purchase.id,
      cart: [{ items: itemsByPurchase.get(purchase.id) ?? [], finalPrice: purchase.final_price }],
      date: purchase.date,
      hour: purchase.hour,
      finalPrice: purchase.final_price,
      dataExpire: purchase.expires_at,
    }))
  } catch (e) {
    console.log("No se pudo leer el historial \n", e)
    return []
  }
}
