import Database from "better-sqlite3";
import fs from 'node:fs'

const database = new Database('server/chrema.db')

database.pragma('foreign_keys = ON')

const schema = fs.readFileSync(
    new URL('./schema.sql', import.meta.url),
    'utf8'
)

database.exec(schema)

export default database