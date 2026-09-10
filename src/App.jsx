import { useState } from 'react'
import BalanceCard from './components/BalanceCard'
import './App.css'

function App() {
  const [amount, setAmount] = useState(1298)

  return (
    <>
      <h1>Chrema</h1>
      <BalanceCard balance={amount}/>

      <button onClick={() => {setAmount(amount - 50)}}>
        Spend R50
      </button>
    </>
  )
}

export default App
