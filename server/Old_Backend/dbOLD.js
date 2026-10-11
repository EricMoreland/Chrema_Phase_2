/* import Database from "better-sqlite3";
import fs from 'node:fs' 

const database = new Database('server/chrema.db')

database.pragma('foreign_keys = ON')

const schema = fs.readFileSync( // "file system" used to read schema.sql setup file to create databse tables
    new URL('./schema.sql', import.meta.url),
    'utf8'
)

database.exec(schema) //takes raw SQL text and executes to create tables in database

export default database */