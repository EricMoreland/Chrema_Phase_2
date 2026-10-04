import { useState } from 'react'

function BudgetsPanel({ budgets, setBudgets }) {
    
const [budgetName, setBudgetName] = useState('')
const [budgetMax, setBudgetMax] = useState('')

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

                return (
                    <div key={budget.id}>
                        <div>{budget.name} - Spent R{budget.spent} / Max R{budget.max}</div>
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