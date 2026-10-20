import db from './PGliteDB.mjs'

// reusable SQL for selects
const accountColumns = `
      AccountId AS "id",
      Name AS "name",
      CashBalance AS "cashBalance",
      CreditBalance AS "creditBalance",
      AccountType AS "type"
`

export async function getAccounts(req, res) {
  try {
    const result = await db.query(`
      SELECT ${accountColumns}
      FROM Account
      ORDER BY AccountId
    `) //save selected rows from account table to result

    res.status(200).json(result.rows) //send as JSON res to frontend with status code 200
  } catch (err) {
    throw err
  } //error handled by Express error handling middleware in index.mjs
}

export async function createAccount(req, res) {
  //get account values from the request body
  const {
    name,
    cashBalance = 0,
    creditBalance = 0,
    type = 'bank'
  } = req.body

  try {
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
      Number(cashBalance),
      Number(creditBalance),
      type
    ])

    res.status(201).json(result.rows[0]) //send new inserted row immediately back to frontend (RETURNING)
  } catch (err) {
    throw err
  }
}

export async function deleteAccount(req, res) {
  const accountId = Number(req.params.accountId) //read accountId from request URL parameter & convert to num

  try {
    //delete only the account matching the URL id
    const result = await db.query(`
      DELETE FROM Account
      WHERE AccountId = $1
      RETURNING AccountId AS "id"
    `, [accountId])

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: 'Account not found'
      })
    }

    res.status(204).send()
  } catch (err) {
    throw err
  }
}