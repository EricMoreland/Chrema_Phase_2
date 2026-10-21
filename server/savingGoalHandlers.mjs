import db from './PGliteDB.mjs'

// Map database columns to the API's camelCase fields.
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
  // Validate and normalise goal details.
  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const targetAmount = Number(body.targetAmount)
  const startDate = body.startDate
  const endDate = body.endDate
  // Validate the date range using the API's ISO date format.
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

  return { name, targetAmount, startDate, endDate }
}

function getAccountId(body) {
  // Read the related account ID.
  const accountId = Number(body.accountId)
  return Number.isInteger(accountId) ? accountId : null
}

export async function createSavingGoal(req, res) {
  try {
    const input = getValidSavingGoalInput(req.body)
    const accountId = getAccountId(req.body)

    if (!input) {
      return res.status(400).json({
        error: 'Provide a valid name, target amount, and date range'
      })
    }

    if (accountId === null) {
      return res.status(400).json({ error: 'An account is required' })
    }

    // Create a goal with zero initial progress.
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

function getValidSavingGoalProgress(body) {
  // Validate positive progress deposits.
  const amount = Number(body.amount)

  return Number.isFinite(amount) && amount > 0 ? amount : null
}

async function inDatabaseTransaction(callback) {
  // Keep related balance updates atomic.
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

export async function updateSavingGoal(req, res) {
  try {
    const savingGoalId = Number(req.params.savingGoalId)

    if (!Number.isInteger(savingGoalId)) {
      return res.status(400).json({ error: 'Invalid saving goal id' })
    }

    if (req.body.kind === 'savings') {
      // Handle progress deposits separately from detail edits.
      const amount = getValidSavingGoalProgress(req.body)

      if (amount === null) {
        return res.status(400).json({
          error: 'Provide a valid update amount'
        })
      }

      const result = await inDatabaseTransaction(async () => {
        // Find the account linked to the goal.
        const goalResult = await db.query(`
          SELECT AccountAccountId
          FROM "Saving Goal"
          WHERE SavingId = $1
        `, [savingGoalId])

        if (goalResult.rows.length === 0) {
          throw new Error('Saving goal not found')
        }

        const accountId = goalResult.rows[0].accountaccountid
        // Deduct funds before recording the deposit.
        const accountResult = await db.query(`
          UPDATE Account
          SET CashBalance = CashBalance - $1
          WHERE AccountId = $2
            AND CashBalance >= $1
          RETURNING AccountId
        `, [amount, accountId])

        if (accountResult.rows.length === 0) {
          throw new Error('Insufficient available balance')
        } 

        // Record the deposited amount.
        const updatedGoal = await db.query(`
          UPDATE "Saving Goal"
          SET CurrentAmount = CurrentAmount + $1
          WHERE SavingId = $2
          RETURNING ${savingGoalColumns}
        `, [amount, savingGoalId])

        return updatedGoal.rows[0]
      }) 

      return res.status(200).json(result)
    }

    const input = getValidSavingGoalInput(req.body)
    const accountId = getAccountId(req.body)

    if (!Number.isInteger(savingGoalId) || !input) {
      return res.status(400).json({
        error: 'Provide a valid name, target amount, and date range'
      })
    }

    if (accountId === null) {
      return res.status(400).json({ error: 'An account is required' })
    }

    // Update goal details without changing saved progress.
    const result = await db.query(`
      UPDATE "Saving Goal"
      SET GoalName = $1,
          GoalAmount = $2,
          StartDate = $3,
          EndDate = $4,
          AccountAccountId = $5
      WHERE SavingId = $6
      RETURNING ${savingGoalColumns}
    `, [
      input.name,
      input.targetAmount,
      input.startDate,
      input.endDate,
      accountId,
      savingGoalId
    ])

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Saving goal not found' })
    }

    res.status(200).json(result.rows[0])
  } catch (err) {
    if (err.message === 'Saving goal not found') {
      return res.status(404).json({ error: err.message })
    }

    if (err.message === 'Insufficient available balance') {
      return res.status(400).json({ error: err.message })
    }

    console.error('Failed to update saving goal:', err)
    res.status(500).json({ error: 'Failed to update saving goal' })
  }
}

export async function deleteSavingGoal(req, res) {
  try {
    const savingGoalId = Number(req.params.savingGoalId)

    if (!Number.isInteger(savingGoalId)) {
      return res.status(400).json({ error: 'Invalid saving goal id' })
    }

    // Confirm that the requested goal existed.
    const result = await db.query(`
      DELETE FROM "Saving Goal"
      WHERE SavingId = $1
      RETURNING SavingId
    `, [savingGoalId])

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Saving goal not found' })
    }

    res.status(204).send()
  } catch (err) {
    throw err
  }
}