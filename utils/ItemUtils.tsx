export default class ItemUtils {
  private readonly setCartItems: React.Dispatch<React.SetStateAction<any[]>>
  private readonly itemId: number

  constructor(
    setCartItems: React.Dispatch<React.SetStateAction<any[]>>,
    itemId: number
  ) {
    this.setCartItems = setCartItems
    this.itemId = itemId
  }

  restar = () => {
    this.setCartItems(prev => (
      prev.map(obj => (
        obj.id === this.itemId
        ? { ...obj, quantity: Math.max(obj.quantity - 1, 1)}
        : obj
      ))
    ))
  }

  sumar = () => {
    this.setCartItems(prev => (
      prev.map(obj => (
        obj.id === this.itemId
        ? { ...obj, quantity: obj.quantity + 1}
        : obj
      ))
    ))
  }

  borrar = () => {
    this.setCartItems(prev => prev.filter(item => item.id !== this.itemId))
  }
}