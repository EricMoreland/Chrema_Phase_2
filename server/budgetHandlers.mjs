import db from './PGliteDB.mjs'

export async function getBudgets(req, res) {
  const accountId = Number(req.query.accountId)

  if (!Number.isInteger(accountId) || accountId <= 0) {
    return res.status(400).json({
      error: 'A valid accountId is required'
    })
  }

  try {
    const result = await db.query(`
      SELECT
        Budget.BudgetId AS "id",
        Category.CategoryName AS "category",
        Budget.BudgetName AS "name",
        Budget.CurrentAmount AS "currentAmount",
        Budget.AmountSet AS "limit",
        Budget.Period AS "period",
        Budget.AccountAccountId AS "accountId"
      FROM Budget
      INNER JOIN Category
        ON Budget.CategoryId = Category.CategoryId
      WHERE Budget.AccountAccountId = $1
      ORDER BY Budget.BudgetId
    `, [accountId])

    res.status(200).json(result.rows)
  } catch (err) {
    throw err
  }
}

function getValidBudgetInput(body) {
    const category = typeof body?.category === 'string' ? body.category.trim() : ''
    const name = typeof body?.name === 'string' ? body.name.trim() : ''
    const limit = Number(body?.limit)
    const period = body?.period
    const validCategories = ['Home', 'Groceries', 'Car', 'Food', 'Other']
    const validPeriods = ['This Week', 'This Month', 'This Year']

    if (
        !validCategories.includes(category) ||
        name.length === 0 ||
        !Number.isFinite(limit) ||
        limit <= 0 ||
        !validPeriods.includes(period)
    ) {
        return null
    }
    return { category, name, limit, period }
}
function getAccountId(body) {
    const accountId = Number(body?.accountId)
    return Number.isInteger(accountId) && accountId > 0 ? accountId : null
}

export async function createBudget(req, res) {
    try {
        const input = getValidBudgetInput(req.body)
        const accountId = getAccountId(req.body)

        if (!input) {
            return res.status(400).json({ error: 'Provide valid budget details'})
        }
        if (accountId === null) {
            return res.status(400).json({ error: 'An account is required'})
        }
        const result = await db.query(`
      INSERT INTO Budget (
        BudgetName,
        CategoryId,
        AccountAccountId,
        AmountSet,
        Period,
        CurrentAmount
      )
      SELECT $1, CategoryId, $2, $3, $4, 0
      FROM Category
      WHERE CategoryName = $5
      RETURNING
        BudgetId AS "id",
        BudgetName AS "name",
        CurrentAmount AS "currentAmount",
        AmountSet AS "limit",
        Period AS "period",
        AccountAccountId AS "accountId"
    `, [
        input.name,
        accountId,
        input.limit,
        input.period,
        input.category
    ]) 

    if (result.rows.length === 0) {
         return res.status(400).json({ error: 'Invalid budget category' })
    }

    res.status(201).json({
        ...result.rows[0],
        category: input.category
    })
}  catch (err) {
     throw err
  }
}

export async function updateBudget(req, res) {
    try {
        const budgetId = Number(req.params.budgetId)
        const input = getValidBudgetInput(req.body)
        const accountId = getAccountId(req.body)

        if (!Number.isInteger(budgetId) || budgetId <= 0 || !input) {
            return res.status(400).json({ error: 'Provide valid budget details'})
        }

        if (accountId === null) {
            return res.status(400).json({ error: 'An account is required'})
        }

        const result = await db.query(`
        UPDATE Budget
        SET
         BudgetName = $1,
         CategoryId = (
          SELECT CategoryId
          FROM Category
          WHERE CategoryName = $2
        ),
        AmountSet = $3,
        Period = $4
      WHERE BudgetId = $5
        AND AccountAccountId = $6
      RETURNING
        BudgetId AS "id",
        BudgetName AS "name",
        CurrentAmount AS "currentAmount",
        AmountSet AS "limit",
        Period AS "period",
        AccountAccountId AS "accountId"
      `, [
            input.name,
            input.category,
            input.limit,
            input.period,
            budgetId,
            accountId
        ])
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Budget not found' })
        }

        res.status(200).json({
        ...result.rows[0],
        category: input.category
        })
    } catch (err) {
     throw err
  }
}

export async function deleteBudget(req, res) {
try {
const budgetId = Number(req.params.budgetId)

if (!Number.isInteger(budgetId) || budgetId <= 0) {
  return res.status(400).json({ error: 'Invalid budget id' })
 }

 const result = await db.query(`
    DELETE FROM Budget
    WHERE BudgetId = $1
    RETURNING BudgetId
    `, [budgetId])

    if (result.rows.length === 0) {
    return res.status(404).json({ error: 'Budget not found' })
        }

        res.status(204).send()
        } catch (err) {
        throw err
    } 
}
