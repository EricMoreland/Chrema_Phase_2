import express, { response } from 'express'
import database from './db.js'

const server = express()
const port = 3001

server.use(express.json())

server.get('/api/health', (request, response) => {
  response.json({
    status: 'ok'
  })
})

server.get('/api/accounts', (request, response) => {
  const accounts = database
    .prepare(`
      SELECT
        AccountId AS id,
        Name AS name,
        Balance AS balance,
        AccountType AS type
      FROM Account
      ORDER BY AccountId
    `)
    .all()

  response.json(accounts)
})

server.get('/api/categories', (request, response) => {
  const categories = database
    .prepare(`
      SELECT
        CategoryId AS id,
        CategoryName AS name
      FROM Category
      ORDER BY CategoryId
    `)
    .all()

  response.json(categories)
})

server.get('/api/budgets', (request, response) => {
  const budgets = database
    .prepare(`
      SELECT
        Budget.BudgetId AS id,
        Category.CategoryName AS name,
        Budget.AmountSet AS max,
        COALESCE(SUM("Transaction".Amount), 0) AS spent
      FROM Budget
      INNER JOIN Category
        ON Budget.CategoryCategoryId = Category.CategoryId
      LEFT JOIN "Transaction"
        ON "Transaction".CategoryCategoryId = Budget.CategoryCategoryId
        AND "Transaction".AccountAccountId = Budget.AccountAccountId
      GROUP BY
        Budget.BudgetId,
        Category.CategoryName,
        Budget.AmountSet
      ORDER BY Budget.BudgetId
    `)
    .all()

  response.json(budgets)
})

server.get('/api/saving-goals', (request, response) => {
  const savingGoals = database
    .prepare(`
      SELECT
        SavingGoalId AS id,
        GoalName AS name,
        GoalAmount AS max,
        CurrentAmount AS currentAmount,
        GoalDate AS goalDate,
        AccountAccountId AS accountId
      FROM "Saving Goal"
      ORDER BY SavingGoalId
    `)
    .all()

  response.json(savingGoals)
})

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})