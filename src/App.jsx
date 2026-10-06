import { useEffect, useState } from 'react'
import BalanceCard from './components/BalanceCard'
import SavingsPanel from './components/SavingsPanel'
import BudgetsPanel from './components/BudgetsPanel'
import AccountBar from './components/AccountBar'
import ReportError from './components/ReportError'
import './App.css'
import axios from 'axios'

const initialAccounts = [
  {
    id: 1,
    name: 'FNB Account',
    cashBalance: 1298,
    creditBalance: 0,
    type: 'bank'
  },
  {
    id: 2,
    name: 'Capitec Account',
    cashBalance: 500,
    creditBalance: 0,
    type: 'bank'
  }
]

function App() {

  const [selectedType, setSelectedType] = useState('cash')
  //const displayBalance = selectedType === 'cash' ? cashBalance : creditBalance (NEW DISPLAYBLANCE VARIABLE BELOW)
  {/*Deciding between which of 2 different states to show, use if () {}/ternary, to set the correct state to variable */ }
  const [transactions, setTransactions] = useState([])
  const [newAmount, setNewAmount] = useState('')
  const [newDescription, setNewDescription] = useState('')

  const [budgets, setBudgets] = useState([])
  const [savingGoals, setSavingGoals] = useState([])

  const categories = ['Home', 'Groceries', 'Car', 'Food', 'Other']
  const [newCategory, setNewCategory] = useState(categories[0])

  const [transactionKind, setTransactionKind] = useState('expense') //expense or income
  const [accounts, setAccounts] = useState(initialAccounts)

  const [showReportError, setShowReportError] = useState(false)
  //const [showTransactionForm, setShowTransactionForm] = useState(false)
  const [activeWorkspaceView, setActiveWorkspaceView] = useState('dashboard')

  //finds and returns the first single item matching the condition

  const [selectedAccountId, setSelectedAccountId] = useState(initialAccounts[0].id)
  const selectedAccount = accounts.find((account) => account.id === selectedAccountId)
  const displayBalance = selectedAccount
    ? (selectedType === 'cash' ? selectedAccount.cashBalance : selectedAccount.creditBalance)
    : 0


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

 //useEffect for accounts in coding.txt on eric desktop

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
        <button
          type="button"
          onClick={() => setShowReportError(true)}
          aria-label="Report Error"
          className="grid size-10 place-items-center rounded-full border-4 border-[#eee9de] bg-[#0d1720] text-2xl text-red-600"
        >
          !
        </button>
      </header>

      <main className="mx-auto mt-8 grid max-w-[1340px] grid-cols-1 items-start gap-4 lg:grid-cols-[278px_minmax(0,1fr)_278px]">
        <SavingsPanel savingGoals={savingGoals} />

        <section className="rounded-[42px] border border-[#41515b] bg-[#172733] p-5 shadow-2xl">
          <AccountBar
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            accounts={accounts}
            selectedAccountId={selectedAccountId}
            setSelectedAccountId={setSelectedAccountId}
            onAddAccount={handleAddAccount}
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
