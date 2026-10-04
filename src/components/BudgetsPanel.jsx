import { useState } from 'react'

function BudgetsPanel({ budgets, setBudgets }) {
    
const [budgetName, setBudgetName] = useState('')
const [budgetMax, setBudgetMax] = useState('')
const [editingId, setEditingId] = useState(null)
const [editName, setEditName] = useState('')
const [editMax, setEditMax] = useState('')

function handleAddBudget() {
    if (!budgetName || !budgetMax) return

    const newBudget = {
        id: Date.now(),
        name: budgetName,
        spent: 0,
        max: Number(budgetMax)
    }

    setBudgets([...budgets, newBudget])
    setBudgetName('')
    setBudgetMax('')
    
}
function handleStartEdit(budget) {
    setEditingId(budget.id)
    setEditName(budget.name)
    setEditMax(budget.max)
}
function handleSaveEdit(id) {
    const updatedbudgets = budgets.map((budget) => {
        if (budget.id === id) {
            return {...budget, name: editName, max: Number(editMax)}
        }
        return budget
    })

    setBudgets(updatedBudgets)
    setEditingId(null)
}

function handleCancelEdit() {
    setEditingId(null)
}

    return (
        <div className="card">
            <h3>Budgets</h3>
            <div style={{ marginBottom: '1rem', display: 'flex', flexDirection:'column', gap: '0.5rem'}}>
            <input
              type="text"
              placeholder="Budget Name"
              value={budgetName}
              onChange={(e) => setBudgetName(e.target.value)}
              />
            <input
            type="number"
            placeholder="Max Amount (R)"
            value={budgetMax}
            onChange={(e) => setBudgetMax(e.target.value)}
            />
            <button onClick={handleAddbudget}>Add Budget</button>
            </div>

            <hr style = {{margin: '1rem 0', borderColor: '#2e3d4d'}} />


            {/* .map runs once PER ITEM in the array*/}
            {budgets.map((budget) => {
                const percentbudget = (budget.spent / budget.max) * 100
                const isEditing = budget.id === editingId
                
                return (
                    <div key={budget.id}>
                        
                    {isEditing ? (
                        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem'}}>
                            <input
                               type="text"
                               value={editName}
                               onChange={(e) => setEditName(e.target.value)}
                               />
                            <input
                               type="number"
                               value={editMax}
                               onChange={(e) => setEditMax(e.target.value)}
                               />
                            <button onClick={() => handleSaveEdit(budget.id)}>Save</button>  
                            <button onClick={handleCancelEdit}>Cancel</button> 
                            </div>
                        
                        )  :  (
                            <div style = {{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>{budget.name} - Spent R{budget.spent} / Max R{budget.max}</div>
                            <button onClick={() => handleStartEdit(budget)}>Edit</button>
                            </div>
                        )}
                        <div className="progress_track">
                            <div className="progress_fill" style={{ width: `${percentbudget}%` }}></div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default BudgetsPanel