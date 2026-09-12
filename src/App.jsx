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
