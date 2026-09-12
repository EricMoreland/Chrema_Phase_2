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
{/*Deciding between which of 2 different states to show, use if () {}/ternary, to set the correct state to variable */}
  const [transactions, setTransactions] = useState([])
  const [newAmount, setNewAmount] = useState('')
  const [newDescription, setNewDescription] = useState('')

  function handleAddTransaction() {
    const amountNumber = Number(newAmount); {/*Input from form is always text, have to convert to a number */}

    const newTransaction = {
      id: Date.now(),
      description: newDescription,
      amount: amountNumber,
      type: selectedType
    }

    setTransactions([...transactions, newTransaction]); {/*... copies everythin already in transactions state then add new one */}

    if (selectedType === 'cash') {
      setCashBalance(cashBalance - amountNumber)
    } else {
      setCreditBalance(creditBalance - amountNumber)
    }

    setNewAmount('')
    setNewDescription('')
  }

  return (
    <>
      <h1>Chrema</h1>

      <AccountBar selectedType={selectedType} setSelectedType={setSelectedType} />
      <div className='dashboard'>
        <SavingsPanel />
        <BalanceCard balance={displayBalance} />
        <BudgetsPanel />
      </div>

      <button 
        onClick={() => 
          selectedType === 'cash'
          ? setCashBalance(cashBalance - 50) 
          : setCreditBalance(creditBalance - 50) 
          }
        >
        Spend R50
      </button>
    </>
  )
}

export default App
