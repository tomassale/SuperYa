import type { SQLiteDatabase } from 'expo-sqlite'
import type { NewPurchase, Note } from '@/interfaces/ItemsInterfaces'

export const insertNote = (db: SQLiteDatabase, note: Note) =>
  // OR IGNORE: un id repetido en datos viejos no debe trabar la migración en cada arranque.
  db.runAsync(
    'INSERT OR IGNORE INTO notes (id, text, done, quantity) VALUES (?, ?, ?, ?)',
    note.id,
    note.text,
    note.done ? 1 : 0,
    note.quantity
  )

// No abre transacción propia porque SQLite no las anida: la abre quien la llama.
export const insertPurchase = async (db: SQLiteDatabase, purchase: NewPurchase) => {
  const { lastInsertRowId } = await db.runAsync(
    'INSERT INTO purchases (date, hour, final_price, expires_at) VALUES (?, ?, ?, ?)',
    purchase.date,
    purchase.hour,
    purchase.finalPrice,
    purchase.dataExpire
  )

  for (const item of purchase.items) {
    await db.runAsync(
      'INSERT INTO purchase_items (purchase_id, product_id, name, quantity, price) VALUES (?, ?, ?, ?, ?)',
      lastInsertRowId,
      item.id,
      item.name,
      item.quantity,
      item.price
    )
  }
}
