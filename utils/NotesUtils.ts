import AsyncStorage from '@react-native-async-storage/async-storage'

const STORAGE_KEY = 'shoppingNotes'

export interface Note {
  id: string
  text: string
  done: boolean
  quantity: number
}

// Lee la lista de notas guardada en el celular.
export const getNotes = async (): Promise<Note[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY)
    if (jsonValue == null) return []
    const parsed = JSON.parse(jsonValue)
    return Array.isArray(parsed) ? parsed : []
  } catch (e) {
    console.log('No se pudieron leer las notas \n', e)
    return []
  }
}

// Guarda la lista completa de notas en el celular.
export const saveNotes = async (notes: Note[]) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
  } catch (e) {
    console.log('No se pudieron guardar las notas \n', e)
  }
}
