import { openDatabaseAsync, type SQLiteDatabase } from 'expo-sqlite'
import { runMigrations } from './migrations'

const DATABASE_NAME = 'superya.db'

let connection: Promise<SQLiteDatabase> | null = null
let lastWrite: Promise<unknown> = Promise.resolve()

const openDatabase = async () => {
  const db = await openDatabaseAsync(DATABASE_NAME)
  // SQLite no aplica las claves foráneas (ni ON DELETE CASCADE) si no se le pide por conexión.
  await db.execAsync('PRAGMA foreign_keys = ON')
  await db.execAsync('PRAGMA journal_mode = WAL')
  await db.execAsync('PRAGMA synchronous = NORMAL')
  await runMigrations(db)
  return db
}

// Todos comparten la misma apertura; si falla, el próximo pedido vuelve a intentar.
export const getDatabase = () => {
  connection ??= openDatabase().catch((e) => {
    connection = null
    throw e
  })
  return connection
}

// Android ejecuta cada llamada en un pool de hilos: la cola mantiene el orden de las
// escrituras y evita que una entre en medio de la transacción de otra.
export const enqueueWrite = <T>(write: (db: SQLiteDatabase) => Promise<T>): Promise<T> => {
  const result = lastWrite.then(async () => write(await getDatabase()))
  lastWrite = result.catch(() => undefined)
  return result
}
