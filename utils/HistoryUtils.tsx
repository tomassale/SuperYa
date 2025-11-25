import AsyncStorage from '@react-native-async-storage/async-storage'
import { ArrayCart } from '@/interfaces/ItemsInterfaces'

export const storeData = async (cart: ArrayCart) => {
  const date = new Date().toLocaleDateString('es-AR', {day: '2-digit', month: '2-digit'})
  const hour = new Date().toLocaleTimeString('es-AR', {hour: '2-digit', minute: '2-digit'})
  const dataExpire = Date.now() + (3 * 24 * 60 * 60 * 1000)
  try{
    const existingData = await AsyncStorage.getItem('purchase');
    let purchases = existingData ? JSON.parse(existingData) : [];
    
    if (!Array.isArray(purchases)) {
      purchases = [purchases];
    }
    
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
    await AsyncStorage.setItem('purchase', jsonValue);
  } catch (e){
    console.log("No se guardo \n", e)
  }
}

export const getData = async () => {
  try{
    const jsonValue = await AsyncStorage.getItem('purchase');
    if (jsonValue != null) {
      const parsedData = JSON.parse(jsonValue);
      
      if (Array.isArray(parsedData)) {
        const validPurchases = parsedData.filter((purchase: any) => 
          !purchase.dataExpire || Date.now() < purchase.dataExpire
        );
        
        await AsyncStorage.setItem('purchase', JSON.stringify(validPurchases));
        
        return validPurchases;
      }
      
      if (parsedData.dataExpire && Date.now() > parsedData.dataExpire) {
        await AsyncStorage.removeItem('purchase');
        return null;
      }
      return parsedData;
    }
    return null;
  }catch(e){
    console.log("No se leyo \n", e);
    return null;
  }
}