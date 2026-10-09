import { useEffect, useState } from 'react'
import BalanceCard from './components/BalanceCard'
import SavingsPanel from './components/SavingsPanel'
import BudgetsPanel from './components/BudgetsPanel'
import AccountBar from './components/AccountBar'
import ReportError from './components/ReportError'
import ReportErrorButton from './components/ReportErrorButton'
import './App.css'
import axios from 'axios'

function App() {

  const [selectedType, setSelectedType] = useState('cash')

  const [transactions, setTransactions] = useState([])
  const [newAmount, setNewAmount] = useState('')
  const [newDescription, setNewDescription] = useState('')

  const [budgets, setBudgets] = useState([])
  const [savingGoals, setSavingGoals] = useState([])

  const categories = ['Home', 'Groceries', 'Car', 'Food', 'Other']
  const [newCategory, setNewCategory] = useState(categories[0])

  const [transactionKind, setTransactionKind] = useState('expense') //expense or income
  const [accounts, setAccounts] = useState([])

  const [showReportError, setShowReportError] = useState(false)
  //const [showTransactionForm, setShowTransactionForm] = useState(false)
  const [activeWorkspaceView, setActiveWorkspaceView] = useState('dashboard')
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


function handleAddAccount(accountDetails) {
  const trimmedName = accountDetails.name.trim()
  const startingCashBalance = Number(accountDetails.cashBalance)

  const nameAlreadyExists = accounts.some(
    (account) => account.name.toLowerCase() === trimmedName.toLowerCase()
  )

  if (nameAlreadyExists) {
    return
  }

  const newAccount = {
    id: Date.now(),
    name: trimmedName,
    cashBalance: startingCashBalance,
    creditBalance: 0,
    type: 'bank'
  }

  setAccounts((currentAccounts) => [...currentAccounts, newAccount])
  setSelectedAccountId(newAccount.id)

  return true
}

function handleDeleteAccount(accountId) {
 const remainingAccounts = accounts.filter(
    (account) => account.id !== accountId
  )

  setAccounts(remainingAccounts)

  if (selectedAccountId === accountId) {
    setSelectedAccountId(remainingAccounts[0].id)
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
    axios
    .get('/api/budgets')
    .then((response) => {
      const budgetData = response.data
      setBudgets(budgetData)
    })   
    .catch((error) => {
        console.error(error) //logs error if axios request fails. Could also use alert() to show user error message.
      })
  }, [])

  useEffect(() => {
    axios.get('/api/saving-goals')
      .then((response) => {
        const savingGoalData = response.data
        setSavingGoals(savingGoalData)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])



  function handleAddTransaction() {
    const amountNumber = Number(newAmount); {/*Input from form is always text, have to convert to a number */ }

    const newTransaction = {
      id: Date.now(),
      description: newDescription,
      amount: amountNumber,
      accountId: selectedAccountId,
      type: selectedType,
      category: newCategory,
      kind: transactionKind
    }

    setTransactions([...transactions, newTransaction]); {/*... copies everythin already in transactions state then add new one */ }

    const plusOrMinusAmount = transactionKind === 'income' ? amountNumber : -amountNumber

    if (selectedAccount) {
      const updatedAccount = {
        ...selectedAccount,
        [selectedType === 'cash' ? 'cashBalance' : 'creditBalance' ]:
        (selectedType === 'cash'
          ? selectedAccount.cashBalance 
          : selectedAccount.creditBalance) + plusOrMinusAmount
      }
    

setAccounts((currentAccounts) =>
 currentAccounts.map((account) => 
    account.id === selectedAccount.id ? updatedAccount : account))
}
  }


  return (
    <div className='min-h-screen bg-[#0d1720] px-2 py-4 text-center text-[#eee9de]'>
      <header className="flex items-center justify-between px-2">
        <h1 className="font-serif text-3xl tracking-wide text-[#eee9de]">Chrema</h1>
        <ReportErrorButton onClick={() => setShowReportError(true)}/>
      </header>

      <main className="mx-auto mt-8 grid max-w-[1340px] grid-cols-1 items-start gap-4 lg:grid-cols-[278px_minmax(0,1fr)_278px]">
        <SavingsPanel savingGoals={savingGoals} />

        <section className="h-fit self-start rounded-[42px] border border-[#41515b] bg-[#172733] p-5 shadow-2xl">
          <AccountBar
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            accounts={accounts}
            selectedAccountId={selectedAccountId}
            setSelectedAccountId={setSelectedAccountId}
            onAddAccount={handleAddAccount}
            onDeleteAccount={handleDeleteAccount}
          />

          <BalanceCard
            balance={displayBalance}
            activeWorkspaceView={activeWorkspaceView}
            onOpenTransaction={() => setActiveWorkspaceView("add-transaction")} 
            onCloseView={() => setActiveWorkspaceView("dashboard")}
            newDescription={newDescription}
            setNewDescription={setNewDescription}
            newAmount={newAmount}
            setNewAmount={setNewAmount}
            handleAddTransactionProp={handleAddTransaction}
            transactions={transactions}
            newCategory={newCategory}
            setNewCategory={setNewCategory}
            categories={categories}
            transactionKind={transactionKind}
            setTransactionKind={setTransactionKind}
          />
        </section>

        <BudgetsPanel budgets={budgets} />
      </main>

      {showReportError && (<ReportError onClose={() => setShowReportError(false)} />)}

    </div>
  )
}

export default App
