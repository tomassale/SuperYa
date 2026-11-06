import type { SQLiteDatabase } from 'expo-sqlite'
import { clearLegacyData, readLegacyData } from './legacyStorage'
import { insertNote, insertPurchase } from './queries'

const SCHEMA_VERSION = 1

// product_id no es clave: los ids de carritos viejos pueden repetirse dentro de una compra.
const CREATE_TABLES = `
  CREATE TABLE notes (
    id TEXT PRIMARY KEY NOT NULL,
    text TEXT NOT NULL,
    done INTEGER NOT NULL,
    quantity INTEGER NOT NULL
  );
  CREATE TABLE purchases (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    hour TEXT NOT NULL,
    final_price REAL NOT NULL,
    expires_at INTEGER NOT NULL
  );
  CREATE TABLE purchase_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    purchase_id INTEGER NOT NULL REFERENCES purchases (id) ON DELETE CASCADE,
    product_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    quantity REAL NOT NULL,
    price REAL NOT NULL
  );
  CREATE INDEX purchases_expires_at ON purchases (expires_at);
  CREATE INDEX purchase_items_purchase_id ON purchase_items (purchase_id);
`

export const runMigrations = async (db: SQLiteDatabase) => {
  const row = await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version')
  if ((row?.user_version ?? 0) >= SCHEMA_VERSION) return

  const legacy = await readLegacyData(Date.now())

  // Esquema, datos importados y versión entran juntos: si algo falla, se reintenta
  // en el próximo arranque con los datos viejos todavía intactos.
  await db.withTransactionAsync(async () => {
    await db.execAsync(CREATE_TABLES)
    for (const note of legacy.notes) await insertNote(db, note)
    for (const purchase of legacy.purchases) await insertPurchase(db, purchase)
    await db.execAsync(`PRAGMA user_version = ${SCHEMA_VERSION}`)
  })

  // Va después del commit: un fallo acá deja basura, nunca pierde datos ni frena la app.
  await clearLegacyData().catch((e) => console.log('No se borraron los datos anteriores \n', e))
}
