function BudgetsPanel() {
    const budgetsArray = [
        {id: 1, name: 'Food', spent: 400, max: 850}
    ]

    return (
        <div>
            <h3>Budgets</h3>
            {/* .map runs once PER ITEM in the array*/}
            {budgetsArray.map((budget) => (
                <div key={budget.id}>
                    {budget.name} - Spent R{budget.spent} / Max R{budget.max}
                </div>
            ))}  
        </div>
    )
}

export default BudgetsPanel