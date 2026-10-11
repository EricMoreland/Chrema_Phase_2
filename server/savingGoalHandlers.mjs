import db from './PGliteDB.mjs'

const savingGoalColumns = `
  SavingId AS "id",
  GoalName AS "name",
  GoalAmount AS "targetAmount",
  CurrentAmount AS "currentAmount",
  StartDate AS "startDate",
  EndDate AS "endDate",
  AccountAccountId AS "accountId"
`

export async function getSavingGoals(req, res) {
    try {
        const result = await db.query(`
    SELECT ${savingGoalColumns}
    FROM "Saving Goal"
    ORDER BY SavingId
  `)

        res.status(200).json(result.rows)
    } catch (err) {
        throw err
    }
}

function getValidSavingGoalInput(body) {
  const name =
    typeof body.name === 'string'
      ? body.name.trim()
      : ''

  const targetAmount = Number(body.targetAmount)
  const startDate = body.startDate
  const endDate = body.endDate

  const validDates =
    /^\d{4}-\d{2}-\d{2}$/.test(startDate) &&
    /^\d{4}-\d{2}-\d{2}$/.test(endDate)

  if (
    name.length === 0 ||
    !Number.isFinite(targetAmount) ||
    targetAmount <= 0 ||
    !validDates ||
    endDate < startDate
  ) {
    return null
  }

  return {
    name,
    targetAmount,
    startDate,
    endDate
  }
}

export async function createSavingGoal(req, res) {
    try {
  const input = getValidSavingGoalInput(req.body)
  const accountId = Number(req.body.accountId)

  if (!input) {
    return res.status(400).json({
      error: 'Provide a valid name, target amount, and date range'
    })
  }

  if (!Number.isInteger(accountId)) {
    return res.status(400).json({
      error: 'An account is required'
    })
  }

  const result = await db.query(`
    INSERT INTO "Saving Goal" (
      GoalName,
      GoalAmount,
      CurrentAmount,
      StartDate,
      EndDate,
      AccountAccountId
    )
    VALUES ($1, $2, 0, $3, $4, $5)
    RETURNING ${savingGoalColumns}
  `, [
    input.name,
    input.targetAmount,
    input.startDate,
    input.endDate,
    accountId
  ])

  res.status(201).json(result.rows[0])
} catch (err) {
  throw err
}
}