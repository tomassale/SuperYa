import type { SQLiteDatabase } from 'expo-sqlite'
import { enqueueWrite, getDatabase } from '@/database/connection'
import { insertNote } from '@/database/queries'
import type { Note } from '@/interfaces/ItemsInterfaces'

type NoteRow = {
  id: string
  text: string
  done: number
  quantity: number
}

const toNote = (row: NoteRow): Note => ({ ...row, done: row.done === 1 })

const writeNotes = async (write: (db: SQLiteDatabase) => Promise<unknown>) => {
  try {
    await enqueueWrite(write)
  } catch (e) {
    console.log('No se pudieron guardar las notas \n', e)
  }
}

// Lee la lista de notas guardada en el celular, en el orden en que se agregaron.
export const getNotes = async (): Promise<Note[]> => {
  try {
    const db = await getDatabase()
    const rows = await db.getAllAsync<NoteRow>('SELECT * FROM notes ORDER BY rowid')
    return rows.map(toNote)
  } catch (e) {
    console.log('No se pudieron leer las notas \n', e)
    return []
  }
}

export const addNote = (note: Note) => writeNotes((db) => insertNote(db, note))

export const updateNote = ({ id, done, quantity }: Note) =>
  writeNotes((db) =>
    db.runAsync('UPDATE notes SET done = ?, quantity = ? WHERE id = ?', done ? 1 : 0, quantity, id)
  )

export const deleteNote = (id: string) =>
  writeNotes((db) => db.runAsync('DELETE FROM notes WHERE id = ?', id))
