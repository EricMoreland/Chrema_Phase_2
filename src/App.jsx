import { useEffect, useState } from 'react'
import BalanceCard from './components/BalanceCard'
import SavingsPanel from './components/SavingsPanel'
import BudgetsPanel from './components/BudgetsPanel'
import AccountBar from './components/AccountBar'
import ReportError from './components/ReportError'
import ReportErrorButton from './components/ReportErrorButton'
import axios from 'axios'
import BudgetForm from './components/BudgetForm'
import DeleteBudget from './components/DeleteBudget'
import DeleteSavingGoal from './components/DeleteSavingGoal'
import SavingGoalForm from './components/SavingGoalForm'

function App() {

  const [selectedType, setSelectedType] = useState('cash')

  const [transactions, setTransactions] = useState([])
  const [newAmount, setNewAmount] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [newDate, setNewDate] = useState(() => {
    const today = new Date()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const day = String(today.getDate()).padStart(2, '0')
    return `${today.getFullYear()}-${month}-${day}`
  })
  const [budgets, setBudgets] = useState([])
  const [savingGoals, setSavingGoals] = useState([])
  const [editingSavingGoal, setEditingSavingGoal] = useState(null)
  const [savingGoalIdToDelete, setSavingGoalIdToDelete] = useState(null)

  const categories = ['Home', 'Groceries', 'Car', 'Food', 'Other']
  const [newCategory, setNewCategory] = useState(categories[0])

  const [transactionKind, setTransactionKind] = useState('expense') //expense or income
  const [accounts, setAccounts] = useState([])

  const [showReportError, setShowReportError] = useState(false)

  const [activeWorkspaceView, setActiveWorkspaceView] = useState('dashboard')

  //finds and returns the first single item matching the condition

  const [editingBudget, setEditingBudget] = useState(null)
  const [budgetIdToDelete, setBudgetIdToDelete] = useState(null)
  

  const budgetCategories = [
    'Home',
    'Groceries',
    'Car',
    'Food',
    'Other'
  ]
  const [selectedAccountId, setSelectedAccountId] = useState(null)

  
  //finds and returns the first single item matching the condition
  const selectedAccount = accounts.find((account) => account.id === selectedAccountId)
  let displayBalance

  if (selectedAccount) {
    if (selectedType === 'cash') {
      displayBalance = selectedAccount.cashBalance
    } else {
      displayBalance = selectedAccount.creditBalance
    }
  } else {
    displayBalance = 0
  }



async function handleAddAccount(accountDetails) {
  const trimmedName = accountDetails.name.trim()
  const startingCashBalance = Number(accountDetails.cashBalance)

  const nameAlreadyExists = accounts.some(
    (account) => account.name.toLowerCase() === trimmedName.toLowerCase()
  )

  if (nameAlreadyExists) {
    return
  }

  try {
  const response = await axios.post('/api/accounts', {
    name: trimmedName,
    cashBalance: startingCashBalance,
    creditBalance: 0,
    type: 'bank'
  })

  const newAccount = response.data

  setAccounts((currentAccounts) => [...currentAccounts, newAccount])
  setSelectedAccountId(newAccount.id)

  return true
} catch (err) {console.error('Failed to add your account:', err)
  return false
  }
}

async function handleDeleteAccount(accountId) {
   try {
    await axios.delete(`/api/accounts/${accountId}`)

    setAccounts((currentAccounts) => {
    const remainingAccounts = currentAccounts.filter(
        (account) => account.id !== accountId
      )


  if (selectedAccountId === accountId) {
    setSelectedAccountId(remainingAccounts[0]?.id ?? null)
  }
  return remainingAccounts
    })
    return true
  } catch (err) {
    console.error('Failed to delete account:', err)
    return false
  }
}


  useEffect(() => {
    axios
      .get('/api/accounts') //receives response object, axios automatically converts json to js array of objects
      .then((response) => {
        const accountData = response.data //therefore use data property to get the array of objects from response object

        setAccounts(accountData)

        if (accountData.length > 0) { //if there are multiple accounts, default to first one.
          setSelectedAccountId(accountData[0]?.id ?? null) //returns null instead of error
        }
      })
      .catch((error) => {
        console.error(error) //axios throws error when request fails.
      })
  }, [])

 useEffect(() => {
  if (selectedAccountId == null) {
    return
  }

  let cancelled = false

  axios
    .get('/api/budgets', { params: { accountId: selectedAccountId } })
    .then((response) => {
      if (!cancelled) {
        setBudgets(response.data)
      }
    })
    .catch((error) => {
      if (!cancelled) {
        console.error('Failed to load budgets:', error)
      }
    })

  return () => {
    cancelled = true
  }
}, [selectedAccountId])

  useEffect(() => {
    axios.get('/api/saving-goals')
      .then((response) => {
        const savingGoalData = response.data
        setSavingGoals(savingGoalData)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])



  async function handleAddTransaction() {
    const amountNumber = Number(newAmount)

    if (!selectedAccountId) {
      alert('Please select an account first.')
      return
    }

    try {
      const response = await axios.post('/api/transactions', {
        description: newDescription,
        amount: amountNumber,
        accountId: selectedAccountId,
        type: selectedType,
        category: newCategory,
        kind: transactionKind,
        date: newDate
      })

      const budgetsResponse = await axios.get('/api/budgets', {
        params: { accountId: selectedAccountId }
      })
      setBudgets(budgetsResponse.data)

      setTransactions((currentTransactions) => [
        ...currentTransactions,
        response.data
      ])

      const accountsResponse = await axios.get('/api/accounts')
      setAccounts(accountsResponse.data)

      setActiveWorkspaceView('dashboard')
    } catch (error) {
      console.error('Failed to add transaction:', error)
      alert('Failed to save transaction. Please try again.')
    }
  }

  async function handleAddBudget(category, name, limit, period) {
  try {
    const response = await axios.post('/api/budgets', {
      accountId: selectedAccountId,
      category,
      name,
      limit,
      period
    })

    setBudgets((currentBudgets) => [...currentBudgets, response.data])
    return true
  } catch (error) {
    console.error('Failed to add budget:', error)
    return false
  }
}

async function handleUpdateBudget(budgetId, category, name, limit, period) {
  try {
    const response = await axios.put(`/api/budgets/${budgetId}`, {
      accountId: selectedAccountId,
      category,
      name,
      limit,
      period
    })

    setBudgets((currentBudgets) =>
      currentBudgets.map((budget) =>
        budget.id === budgetId ? response.data : budget
      )
    )
    return true
  } catch (error) {
    console.error('Failed to update budget:', error)
    return false
  }
}

async function handleDeleteBudget(budgetId) {
  try {
    await axios.delete(`/api/budgets/${budgetId}`)
    setBudgets((currentBudgets) =>
      currentBudgets.filter((budget) => budget.id !== budgetId)
    )
    return true
  } catch (error) {
    console.error('Failed to delete budget:', error)
    return false
  }
}

  function closeBudgetView() {
    setActiveWorkspaceView('dashboard')
    setEditingBudget(null)
    setBudgetIdToDelete(null)
  }

  function openAddBudget() {
    setEditingBudget(null)
    setActiveWorkspaceView('add-budget')
  }

  function openEditBudget(budget) {
    setEditingBudget(budget)
    setActiveWorkspaceView('edit-budget')
  }

  function openDeleteBudget(budgetId) {
    setBudgetIdToDelete(budgetId)
    setActiveWorkspaceView('delete-budget')
  }

  async function handleAddSavingGoal(goalDetails) {
  try {
    const response = await axios.post('/api/saving-goals', goalDetails)

    setSavingGoals((currentGoals) => [...currentGoals, response.data])

      return true
    } catch (error) {
      console.error('Failed to add saving goal:', error)
      return false
    }
  }

  async function handleUpdateSavingGoal(savingGoalId, goalDetails) {
    try {
      const response = await axios.post(
        `/api/saving-goals/${savingGoalId}`,
        goalDetails
      )

      setSavingGoals((currentGoals) =>
        currentGoals.map((goal) =>
          goal.id === savingGoalId ? response.data : goal
        )
      )

      if (goalDetails.kind === 'savings') {
        const accountsResponse = await axios.get('/api/accounts')
        setAccounts(accountsResponse.data)
      }

      return true
    } catch (error) {
      console.error('Failed to update saving goal:', error)
      return false
    }
  }

  async function handleDeleteSavingGoal(savingGoalId) {
    try {
      await axios.delete(`/api/saving-goals/${savingGoalId}`)
      setSavingGoals((currentGoals) =>
        currentGoals.filter((goal) => goal.id !== savingGoalId)
      )
    } catch (error) {
      console.error('Failed to delete saving goal:', error)
    }
  }

  function closeSavingGoalView() {
    setActiveWorkspaceView('dashboard')
    setEditingSavingGoal(null)
    setSavingGoalIdToDelete(null)
  }

  function openAddSavingGoal() {
    setEditingSavingGoal(null)
    setActiveWorkspaceView('add-saving-goal')
  }

  function openEditSavingGoal(savingGoal) {
    setEditingSavingGoal(savingGoal)
    setActiveWorkspaceView('edit-saving-goal')
  }

  function openUpdateProgress(savingGoal) {
    setEditingSavingGoal(savingGoal)
    setActiveWorkspaceView('update-progress')
  }

  function openDeleteSavingGoal(savingGoalId) {
    setSavingGoalIdToDelete(savingGoalId)
    setActiveWorkspaceView('delete-saving-goal')
  }

  return (
    <div className='min-h-screen bg-[#0d1720] px-2 py-4 text-center text-[#eee9de]'>
      <header className="flex items-center justify-between px-2">
        <h1 className="font-serif text-3xl tracking-wide text-[#eee9de]">Chrema</h1>
        <ReportErrorButton onClick={() => setShowReportError(true)}/>
      </header>

      <main className="mx-auto mt-8 grid max-w-[1340px] grid-cols-1 items-start gap-4 lg:grid-cols-[278px_minmax(0,1fr)_278px]">
        <SavingsPanel
          savingGoals={savingGoals}
          onRequestAdd={openAddSavingGoal}
          onRequestEdit={openEditSavingGoal}
          onRequestDelete={openDeleteSavingGoal}
          onRequestUpdateProgress={openUpdateProgress}
        />

        <section className="rounded-[42px] border border-[#41515b] bg-[#172733] p-5 shadow-2xl">

          {activeWorkspaceView === 'add-saving-goal' ||
            activeWorkspaceView === 'edit-saving-goal' ||
            activeWorkspaceView === 'update-progress' ? (
            <SavingGoalForm
              savingGoal={
                activeWorkspaceView === 'edit-saving-goal' ||
                activeWorkspaceView === 'update-progress'
                  ? editingSavingGoal
                  : undefined
              }
              accountId={selectedAccountId}
              onAddSavingGoal={handleAddSavingGoal}
              onUpdateSavingGoal={handleUpdateSavingGoal}
              onClose={closeSavingGoalView}
              isUpdateProgress={activeWorkspaceView === 'update-progress'}
            />
          ) : activeWorkspaceView === 'add-budget' ||
            activeWorkspaceView === 'edit-budget' ? (
            <BudgetForm
              budget={activeWorkspaceView === 'edit-budget' ? editingBudget : undefined}
              budgetCategories={budgetCategories}
              onAddBudget={handleAddBudget}
              onUpdateBudget={handleUpdateBudget}
              onClose={closeBudgetView}
            />
          ) : activeWorkspaceView === 'delete-budget' ? (
            <DeleteBudget
              onDelete={async () => {
               const deleted = await handleDeleteBudget(budgetIdToDelete)

               if (!deleted) {
                alert('Failed to delete budget. Please try again.')
                return
              }

              closeBudgetView()
           }}
            onExit={closeBudgetView}
         />
          ) : activeWorkspaceView === 'delete-saving-goal' ? (
            <DeleteSavingGoal
              onDelete={() => {
                handleDeleteSavingGoal(savingGoalIdToDelete)
                closeSavingGoalView()
              }}
              onExit={closeSavingGoalView}
            />
          ) : (
            <>
              {activeWorkspaceView === 'dashboard' && (
              <AccountBar
                selectedType={selectedType}
                setSelectedType={setSelectedType}
                accounts={accounts}
                selectedAccountId={selectedAccountId}
                setSelectedAccountId={setSelectedAccountId}
                onAddAccount={handleAddAccount}
                onDeleteAccount={handleDeleteAccount}
              />
              )}

              <BalanceCard
                balance={displayBalance}
                activeWorkspaceView={activeWorkspaceView}
                onOpenTransaction={() => setActiveWorkspaceView('add-transaction')}
                onCloseView={() => setActiveWorkspaceView('dashboard')}
                newDescription={newDescription}
                setNewDescription={setNewDescription}
                newAmount={newAmount}
                setNewAmount={setNewAmount}
                newDate={newDate}
                setNewDate={setNewDate}
                handleAddTransactionProp={handleAddTransaction}
                transactions={transactions}
                newCategory={newCategory}
                setNewCategory={setNewCategory}
                categories={categories}
                transactionKind={transactionKind}
                setTransactionKind={setTransactionKind}
              />
            </>
          )}
        </section>

        <BudgetsPanel
          budgets={selectedAccountId == null ? [] : budgets}
          onRequestAdd={openAddBudget}
          onRequestEdit={openEditBudget}
          onRequestDelete={openDeleteBudget}
        />
      </main>

      {showReportError && (<ReportError onClose={() => setShowReportError(false)} />)}

    </div>
  )
}

export default App
