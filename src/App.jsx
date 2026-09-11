import { useState } from 'react'
import BalanceCard from './components/BalanceCard'
import SavingsPanel from './components/SavingsPanel'
import BudgetsPanel from './components/BudgetsPanel'
import './App.css'

function App() {
  const [amount, setAmount] = useState(1298)

  return (
    <>
      <h1>Chrema</h1>
      <SavingsPanel />
      
      <BalanceCard balance={amount}/>
      
      <BudgetsPanel />

      <button onClick={() => {setAmount(amount - 50)}}>
        Spend R50
      </button>
    </>
  )
}

export default App
