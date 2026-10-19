import db from './PGliteDB.mjs'

const transactionColumns = `
  TransactionId AS "id",
  Description AS "description",
  Amount AS "amount",
  AccountAccountId AS "accountId",
  AccountType AS "type",
  TransactionKind AS "kind",
  TO_CHAR(CreatedAt, 'YYYY-MM-DD') AS "date"
`

class RequestError extends Error {
  constructor(status, message) {
    super(message)
    this.status = status
  }
}

function getValidTransactionInput(body) {
  const description =
    typeof body?.description === 'string' ? body.description.trim() : ''
  const amount = Number(body?.amount)
  const accountId = Number(body?.accountId)
  const type = body?.type
  const category =
    typeof body?.category === 'string' ? body.category.trim() : ''
  const kind = body?.kind
  const date = body?.date
  const parsedDate =
    typeof date === 'string' ? new Date(`${date}T00:00:00.000Z`) : null
  const validDate =
    typeof date === 'string' &&
    /^\d{4}-\d{2}-\d{2}$/.test(date) &&
    parsedDate !== null &&
    !Number.isNaN(parsedDate.getTime()) &&
    parsedDate.toISOString().slice(0, 10) === date

  if (
    description.length === 0 ||
    !Number.isFinite(amount) ||
    amount <= 0 ||
    !Number.isInteger(accountId) ||
    accountId <= 0 ||
    !['cash', 'credit'].includes(type) ||
    !['Home', 'Groceries', 'Car', 'Food', 'Other'].includes(category) ||
    !['income', 'expense'].includes(kind) ||
    !validDate
  ) {
    return null
  }

  return { description, amount, accountId, type, category, kind, date }
}

async function inDatabaseTransaction(callback) {
  await db.exec('BEGIN')
  try {
    const result = await callback()
    await db.exec('COMMIT')
    return result
  } catch (err) {
    await db.exec('ROLLBACK')
    throw err
  }
}

export async function getTransactions(req, res) {
  const accountId =
    req.query.accountId === undefined ? null : Number(req.query.accountId)

  if (
    accountId !== null &&
    (!Number.isInteger(accountId) || accountId <= 0)
  ) {
    return res.status(400).json({
      error: 'A valid accountId is required'
    })
  }

  try {
    const result = await db.query(`
      SELECT
        ${transactionColumns},
        Category.CategoryName AS "category"
      FROM "Transaction"
      INNER JOIN Category
        ON "Transaction".CategoryCategoryId = Category.CategoryId
      WHERE $1::integer IS NULL
        OR "Transaction".AccountAccountId = $1
      ORDER BY "Transaction".CreatedAt, "Transaction".TransactionId
    `, [accountId])

    res.status(200).json(result.rows)
  } catch (err) {
    throw err
  }
}

export async function createTransaction(req, res) {
  const input = getValidTransactionInput(req.body)

  if (!input) {
    return res.status(400).json({ error: 'Provide valid transaction details' })
  }

  try {
    const transaction = await inDatabaseTransaction(async () => {
      const accountResult = await db.query(`
        SELECT AccountId
        FROM Account
        WHERE AccountId = $1
      `, [input.accountId])

      if (accountResult.rows.length === 0) {
        throw new RequestError(404, 'Account not found')
      }

      const categoryResult = await db.query(`
        SELECT CategoryId
        FROM Category
        WHERE CategoryName = $1
      `, [input.category])

      if (categoryResult.rows.length === 0) {
        throw new RequestError(400, 'Invalid transaction category')
      }

      const categoryId = categoryResult.rows[0].categoryid
      const amountChange = input.kind === 'income' ? input.amount : -input.amount
     

      const transactionResult = await db.query(`
        INSERT INTO "Transaction" (
          Description,
          Amount,
          AccountAccountId,
          CategoryCategoryId,
          AccountType,
          TransactionKind,
          CreatedAt
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7::date)
        RETURNING ${transactionColumns}
      `, [
        input.description,
        input.amount,
        input.accountId,
        categoryId,
        input.type,
        input.kind,
        input.date
      ])

      await db.query(`
        UPDATE Account
        SET
          CashBalance = CASE
            WHEN $1 = 'cash' THEN CashBalance + $2
            ELSE CashBalance
          END,
          CreditBalance = CASE
            WHEN $1 = 'credit' THEN CreditBalance + $2
            ELSE CreditBalance
          END
        WHERE AccountId = $3
      `, [input.type, amountChange, input.accountId])

      if (input.kind === 'expense') {
        await db.query(`
          UPDATE Budget
          SET CurrentAmount = CurrentAmount + $1
          WHERE AccountAccountId = $2
            AND CategoryId = $3
            AND (
              (
                Period = 'This Week'
                AND DATE_TRUNC('week', $4::date::timestamp) =
                    DATE_TRUNC('week', CURRENT_DATE::timestamp)
              )
              OR (
                Period = 'This Month'
                AND DATE_TRUNC('month', $4::date::timestamp) =
                    DATE_TRUNC('month', CURRENT_DATE::timestamp)
              )
              OR (
                Period = 'This Year'
                AND DATE_TRUNC('year', $4::date::timestamp) =
                    DATE_TRUNC('year', CURRENT_DATE::timestamp)
              )
            )
        `, [input.amount, input.accountId, categoryId, input.date])
      }

      return {
        ...transactionResult.rows[0],
        category: input.category
      }
    })

    res.status(201).json(transaction)
  } catch (err) {
    if (err instanceof RequestError) {
      return res.status(err.status).json({ error: err.message })
    }
    throw err
  }
}