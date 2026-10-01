import { useEffect, useState } from 'react'
import BalanceCard from './components/BalanceCard'
import SavingsPanel from './components/SavingsPanel'
import BudgetsPanel from './components/BudgetsPanel'
import AccountBar from './components/AccountBar'
import './App.css'

function App() {
  const [cashBalance, setCashBalance] = useState(1298)
  const [creditBalance, setCreditBalance] = useState(-450)

  const [selectedType, setSelectedType] = useState('cash')
  const displayBalance = selectedType === 'cash' ? cashBalance : creditBalance
  {/*Deciding between which of 2 different states to show, use if () {}/ternary, to set the correct state to variable */ }
  const [transactions, setTransactions] = useState([])
  const [newAmount, setNewAmount] = useState('')
  const [newDescription, setNewDescription] = useState('')

  const [budgets, setBudgets] = useState([])
  const [savingGoals, setSavingGoals] = useState([])

  const categories = ['Home', 'Groceries', 'Car', 'Food', 'Other']
  const [newCategory, setNewCategory] = useState(categories[0])

  const [transactionKind, setTransactionKind] = useState('expense') //expense or income

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
      category: newCategory
    }

    setTransactions([...transactions, newTransaction]); {/*... copies everythin already in transactions state then add new one */ }

    if (selectedType === 'cash') {
      setCashBalance(cashBalance + amountNumber)
    } else {
      setCreditBalance(creditBalance + amountNumber)
    }

    setNewAmount('')
    setNewDescription('')
    setNewCategory(categories[0])
  }

  return (
    <>
      <div className='app_container'>
        <h1>Chrema</h1>

        <AccountBar selectedType={selectedType} setSelectedType={setSelectedType} />
        <div className='dashboard'>
          <SavingsPanel savingGoals={savingGoals} />
          <BalanceCard
            balance={displayBalance}
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
          <BudgetsPanel budgets={budgets} />
        </div>
      </div>
    </>
  )
}

export default App
