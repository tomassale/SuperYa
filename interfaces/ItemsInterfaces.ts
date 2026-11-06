export interface Product {
  id: number
  name: string
  quantity: number
  price: number
}

export interface ArrayCart{
  items: Product[],
  finalPrice: number
}

export interface History{
  id: number
  cart: ArrayCart[]
  date: string
  hour: string
  finalPrice: number
  dataExpire: number
}

export type NewPurchase = Omit<History, 'id' | 'cart'> & {
  items: Product[]
}

export interface Note {
  id: string
  text: string
  done: boolean
  quantity: number
}