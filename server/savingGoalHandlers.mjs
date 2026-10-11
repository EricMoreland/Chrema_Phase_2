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