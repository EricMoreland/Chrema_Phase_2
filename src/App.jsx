import { useState } from 'react'
import BalanceCard from './components/BalanceCard'
import SavingsPanel from './components/SavingsPanel'
import BudgetsPanel from './components/BudgetsPanel'
import AccountBar from './components/AccountBar'
import './App.css'

function App() {
  const [amount, setAmount] = useState(1298)

  return (
    <>
      <h1>Chrema</h1>

      <AccountBar />
      <div className='dashboard'>
      <SavingsPanel />
      <BalanceCard balance={amount}/>
      <BudgetsPanel />
      </div>

      <button onClick={() => {setAmount(amount - 50)}}>
        Spend R50
      </button>
    </>
  )
}

export default App
