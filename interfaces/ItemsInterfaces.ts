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