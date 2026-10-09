import express from 'express';
import db from './PGliteDB.mjs';
import { getAccounts, createAccount, deleteAccount } from './accountHandlers.mjs'

const server = express()
const port = 3001

server.use(express.json())

//account routes
server.get('/api/accounts', getAccounts)
server.post('/api/accounts', createAccount)
server.delete('/api/accounts/:accountId', deleteAccount)


server.listen(port, () => console.log("Server is listening..."))


//await db.close()
//console.log('Database closed')
