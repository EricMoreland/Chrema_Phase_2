import express from 'express' //type = module in package.json allows us to use import instead of require
import database from './db.js'

const server = express()
const port = 3001

server.use(express.json()) //Attaches a incoming JSON,  parses it,  and makes the data available in request.body. NB for Post Requests

server.get('/api/health', (request, response) => {
  response.json({
    status: 'ok'
  }) //makes the object json and sends to client (therefore: the response)
})

server.get('/api/accounts', (request, response) => { //register GET request on the path api/acounts
  const accounts = database                          //callback runs when client hits URL
    .prepare(`
      SELECT
        AccountId AS id,
        Name AS name,
        CashBalance AS cashBalance,
        CreditBalance AS creditBalance,
        AccountType AS type
      FROM Account
      ORDER BY AccountId
    `)
    .all() // (runs SQL on databse) execute prepared statement and return rows as an array of objects

  response.json(accounts) //object -> json -> send to client
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
        Budget.CurrentAmount AS currentAmount
      FROM Budget
      INNER JOIN Category
        ON Budget.CategoryCategoryId = Category.CategoryId
      ORDER BY Budget.BudgetId
    `)
    .all()

  response.json(budgets)
})

server.get('/api/saving-goals', (request, response) => { //GoalName AS name, therefore have to use name in components, not GoalAmount.
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

server.listen(port, () => { //bind express app to network port and start listening for incoming requests (fetch() calls)
  console.log(`Server running at http://localhost:${port}`) //callback runs after server bound to port
})
//