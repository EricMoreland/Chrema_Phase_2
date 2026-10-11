import express from 'express';
import { getAccounts, createAccount, deleteAccount } from './accountHandlers.mjs'
import { getSavingGoals } from './savingGoalHandlers.mjs'

const server = express()
const port = 3001

server.use(express.json())

//account routes
server.get('/api/accounts', getAccounts)
server.post('/api/accounts', createAccount)
server.delete('/api/accounts/:accountId', deleteAccount)

//saving goal routes
server.get('/api/saving-goals', getSavingGoals)


server.use((err, req, res, next) => {
  console.error('Server error:', err)

  res.status(500).json({
    error: 'Internal server error'
  })
}) //to catch all the thrown err's from Handler files

server.listen(port, () => console.log("Server is listening..."))


//await db.close()
//console.log('Database closed')
