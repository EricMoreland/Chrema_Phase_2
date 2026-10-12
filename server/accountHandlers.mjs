import db from './PGliteDB.mjs'

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
    `)

    res.status(200).json(result.rows)
  } catch (err) {
    throw err
  }
}

export async function createAccount(req, res) {
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

    res.status(201).json(result.rows[0])
  } catch (err) {
    throw err
  }
}

export async function deleteAccount(req, res) {
  const accountId = Number(req.params.accountId)

  try {
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