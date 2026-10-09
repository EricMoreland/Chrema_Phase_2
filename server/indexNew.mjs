import express from 'express';
import db from './PGliteDB.mjs';

const server = express()
const port = 3001
//the async returns a promise, because the await's in the funciton waits to resolve the promise 
//therefore it is synchronous, awaits makes it read and run like its synchronous.
//contente type in the response in network tab is mime type
server.use(express.json())

server.get('/api/accounts', async (req, res) => {
    const result = await db.query(`
        SELECT
            AccountId AS "id",
            Name AS "name",
            CashBalance AS "cashBalance",
            CreditBalance AS "creditBalance",
            AccountType AS "type"
        FROM Account
        ORDER BY AccountId
    `);
    res.json(result.rows)
})

server.post('/api/accounts', async (req, res) => {
    const {
        name,
        cashBalance = 0,
        creditBalance = 0,
        type = 'bank'
    } = req.body

    const cashBalanceNumber = Number(cashBalance)
    const creditBalanceNumber = Number(creditBalance)

    const result = await db.query(`
        INSERT INTO Account (
        Name,
        CashBalance,
        CreditBalance,
        AccountType
        )
        VALUES ($1, $2, $3, $4)
        RETURNING
        AccountId AS "id",
        Name AS "name",
        CashBalance AS "cashBalance",
        CreditBalance AS "creditBalance",
        AccountType AS "type"
    `, [
      name,
      cashBalanceNumber,
      creditBalanceNumber,
      type
    ])
    res.status(201).json(result.rows[0])
})

server.delete('./api/accounts:accountId', async (req, res) => {
     const accountId = Number(req.params.accountId)
    
     try {
        const result = await db.query(`
            DELETE FROM Account
            WHERE AccountId = $1
            RETURNING AccountId AS "id" 
            `, [accountId])//returning accountId as id, so that we can check if the account was deleted or not(if statement). If no rows are returned, then the account was not found and therefore not deleted.

        if (result.rows.length === 0) {
            return res.status(404).json({err: 'No account to delete'})
        }

            res.status(204).send()

    } catch (err) {
        console.error('Failed to delete:', err)
        
        res.status(500).json({err: 'Failed to delete account'})
    }
})



server.listen(port, () => console.log("Server is listening..."))


//await db.close()
//console.log('Database closed')
