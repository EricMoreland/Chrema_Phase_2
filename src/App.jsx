import { useState } from 'react'
import BalanceCard from './components/BalanceCard'
import SavingsPanel from './components/SavingsPanel'
import BudgetsPanel from './components/BudgetsPanel'
import AccountBar from './components/AccountBar'
import './App.css'
import axios from 'axios'

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

  const [transactionKind, setTransactionKind] = useState('expense') //expense or income
  const [accounts, setAccounts] = useState([])

  const [showTransactionForm, setShowTransactionForm] = useState(false)


  //finds and returns the first single item matching the condition

  const [selectedAccountId, setSelectedAccountId] = useState(null)
  const selectedAccount = accounts.find((account) => account.id === selectedAccountId)

  const displayBalance = selectedAccount
    ? (selectedType === 'cash' ? selectedAccount.cashBalance : selectedAccount.creditBalance)
    : 0



  useEffect(() => {
    axios
    .get('/api/accounts') //receives response object, axios automatically converts json to js array of objects
      .then((response) => {
        const accountData = response.data //therefore use data property to get the array of objects from response object
        
        setAccounts(accountData)

        if (accountData.length > 0) { //if there are multiple accounts, default to first one.
          setSelectedAccountId(accountData[0].id)
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
