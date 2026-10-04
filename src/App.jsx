import { useState } from 'react'
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

  const categories = ['Home', 'Groceries', 'Car', 'Food', 'Other']
  const [newCategory, setNewCategory] = useState(categories[0])
  const [budgets, setBudgets] = useState([
    { id: 1, name: 'Food', spent: 400, max: 850}
  ])
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
          <SavingsPanel />
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
          />
          <BudgetsPanel budgets={budgets} setBudgets={setBudgets} />
        </div>
      </div>
    </>
  )
}

export default App
