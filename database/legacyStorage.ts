import AsyncStorage from '@react-native-async-storage/async-storage'
import { PURCHASE_LIFETIME_MS } from '@/constants/Purchases'
import type { NewPurchase, Note, Product } from '@/interfaces/ItemsInterfaces'

const NOTES_KEY = 'shoppingNotes'
const PURCHASES_KEY = 'purchase'

export type LegacyData = {
  notes: Note[]
  purchases: NewPurchase[]
}

const isFiniteNumber = (value: unknown): value is number =>
  typeof value === 'number' && Number.isFinite(value)

// Las compras más viejas se guardaban como un objeto suelto, no como una lista.
const parseRecords = (json: string | null): any[] => {
  if (json == null) return []
  try {
    const parsed = JSON.parse(json)
    return Array.isArray(parsed) ? parsed : [parsed]
  } catch (e) {
    console.log('Datos anteriores ilegibles, se descartan \n', e)
    return []
  }
}

const toNote = (record: any): Note | null => {
  if (record?.id == null || typeof record.text !== 'string') return null
  return {
    id: String(record.id),
    text: record.text,
    done: Boolean(record.done),
    quantity: isFiniteNumber(record.quantity) ? Math.max(1, record.quantity) : 1,
  }
}

const toProduct = (record: any, index: number): Product | null => {
  if (typeof record?.name !== 'string') return null
  if (!isFiniteNumber(record.quantity) || !isFiniteNumber(record.price)) return null
  return {
    id: isFiniteNumber(record.id) ? record.id : index,
    name: record.name,
    quantity: record.quantity,
    price: record.price,
  }
}

const toPurchase = (record: any, now: number): NewPurchase | null => {
  const dataExpire = isFiniteNumber(record?.dataExpire) ? record.dataExpire : now + PURCHASE_LIFETIME_MS
  if (record == null || dataExpire <= now) return null

  const groups: any[] = Array.isArray(record.cart) ? record.cart : []
  const items = groups
    .flatMap((group) => (Array.isArray(group?.items) ? group.items : []))
    .map(toProduct)
    .filter((item): item is Product => item !== null)

  return {
    date: typeof record.date === 'string' ? record.date : '',
    hour: typeof record.hour === 'string' ? record.hour : '',
    finalPrice: isFiniteNumber(record.finalPrice) ? record.finalPrice : 0,
    dataExpire,
    items,
  }
}

export const readLegacyData = async (now: number): Promise<LegacyData> => {
  const [notesJson, purchasesJson] = await Promise.all([
    AsyncStorage.getItem(NOTES_KEY),
    AsyncStorage.getItem(PURCHASES_KEY),
  ])

  return {
    notes: parseRecords(notesJson)
      .map(toNote)
      .filter((note): note is Note => note !== null),
    purchases: parseRecords(purchasesJson)
      .map((record) => toPurchase(record, now))
      .filter((purchase): purchase is NewPurchase => purchase !== null),
  }
}

export const clearLegacyData = () => AsyncStorage.multiRemove([NOTES_KEY, PURCHASES_KEY])
