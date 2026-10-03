import { useEffect, useState } from 'react'
import BalanceCard from './components/BalanceCard'
import SavingsPanel from './components/SavingsPanel'
import BudgetsPanel from './components/BudgetsPanel'
import AccountBar from './components/AccountBar'
import './App.css'

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
  const [accounts, setAccounts] = useState([])

  const [showTransactionForm, setShowTransactionForm] = useState(false)


  //finds and returns the first single item matching the condition

  const [selectedAccountId, setSelectedAccountId] = useState(null)
  const selectedAccount = accounts.find((account) => account.id === selectedAccountId)

  const displayBalance = selectedAccount
    ? (selectedType === 'cash' ? selectedAccount.cashBalance : selectedAccount.creditBalance)
    : 0

  //useing async function to use "await". it does that same as using .then().

  useEffect(() => {
    async function loadAccounts() {
      try {
        const response = await fetch('api/accounts')

        if (!response.ok) {
          throw new Error('Could not load the accounts') //new Error creates Error object, throw stops code and sends error to nearest catch
        }

        const accountData = await response.json() //without await JS wont stop and wait for promise to resolve it will setAccounts to a Promise object
        setAccounts(accountData)

        if (accountData.length > 0) { //if there are multiple accounts, default to first one.
          setSelectedAccountId(accountData[0].id)
        }
      } catch (error) {
        console.error(error) //or use console.log or use console.error(error.message)
      }
    }
    loadAccounts()
  }, [])

  useEffect(() => {
    async function loadBudgets() {
      try {
        const response = await fetch('/api/budgets') //receives response object

        if (!response.ok) { //response object has a property called ok, which = true if successful
          throw new Error('Could not load budgets')
        }

        const budgetData = await response.json() //converts jsaon response to js array of objects
        setBudgets(budgetData)
      } catch (error) {
        console.error(error) //logging if response.ok is false
      }
    }

    loadBudgets()
  }, [])

  useEffect(() => {
    async function loadSavingGoals() {
      try {
        const response = await fetch('/api/saving-goals')

        if (!response.ok) {
          throw new Error('Could not load saving goals')
        }

        const savingGoalData = await response.json()
        setSavingGoals(savingGoalData)
      } catch (error) {
        console.error(error)
      }
    }

    loadSavingGoals()
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

    if (selectedType === 'cash') {
      setCashBalance(cashBalance + plusOrMinusAmount)
    } else {
      setCreditBalance(creditBalance + plusOrMinusAmount)
    }

    setNewAmount('')
    setNewDescription('')
    setNewCategory(categories[0])
    setTransactionKind('expense')
  }

  return (
    <div className='min-h-screen bg-[#0d1720] px-2 py-4 text-center text-[#eee9de]'>
      <header className="flex items-center justify-between px-2">
        <h1 className="font-serif text-3xl tracking-wide text-[#eee9de]">Chrema</h1>
        <button
          type="button"
          aria-label="Notifications"
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
          />

          <BalanceCard
            balance={displayBalance}
            showTransactionForm={showTransactionForm}
            setShowTransactionForm={setShowTransactionForm}
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
    </div>
  )
}

export default App
