import AsyncStorage from '@react-native-async-storage/async-storage'
import { ArrayCart } from '@/interfaces/ItemsInterfaces'

const STORAGE_KEY = 'purchase'
// Tiempo de vida de los datos de una compra en el celular: 3 dias.
const EXPIRE_MS = 3 * 24 * 60 * 60 * 1000

// Una compra está vencida si ya pasó su fecha de expiración.
const isExpired = (purchase: any) =>
  purchase?.dataExpire && Date.now() >= purchase.dataExpire

// Elimina del celular únicamente las compras vencidas y reescribe las vigentes.
// Devuelve las compras que siguen vigentes (o null si no quedó ninguna).
export const purgeExpiredData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY)
    if (jsonValue == null) return null

    const parsedData = JSON.parse(jsonValue)
    const purchases = Array.isArray(parsedData) ? parsedData : [parsedData]

    const validPurchases = purchases.filter((purchase: any) => !isExpired(purchase))

    // Si no cambió nada, no reescribimos para no tocar el almacenamiento en vano.
    if (validPurchases.length === purchases.length) {
      return validPurchases
    }

    if (validPurchases.length === 0) {
      // No queda ninguna compra vigente: se borra la clave del celular.
      await AsyncStorage.removeItem(STORAGE_KEY)
      return null
    }

    // Se reescribe dejando SOLO las vigentes: las vencidas quedan fuera del celular.
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(validPurchases))
    return validPurchases
  } catch (e) {
    console.log("No se pudo purgar el historial \n", e)
    return null
  }
}

export const storeData = async (cart: ArrayCart) => {
  const date = new Date().toLocaleDateString('es-AR', {day: '2-digit', month: '2-digit'})
  const hour = new Date().toLocaleTimeString('es-AR', {hour: '2-digit', minute: '2-digit'})
  const dataExpire = Date.now() + EXPIRE_MS
  try{
    // Al guardar aprovechamos para descartar las compras ya vencidas.
    const existingData = await purgeExpiredData()
    let purchases = Array.isArray(existingData) ? existingData : [];

    const data = {
      id: dataExpire,
      cart: [cart],
      date: date,
      hour: hour,
      finalPrice: cart.finalPrice,
      dataExpire: dataExpire
    }

    purchases.push(data);
    const jsonValue = JSON.stringify(purchases);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
  } catch (e){
    console.log("No se guardo \n", e)
  }
}

export const getData = async () => {
  // Leer el historial ya descarta de paso las compras vencidas.
  return await purgeExpiredData()
}
