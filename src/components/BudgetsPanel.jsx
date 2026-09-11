function BudgetsPanel() {
    const budgetsArray = [
        {id: 1, name: 'Food'}
    ]

    return (
        <div>
            <h3>Budgets</h3>
            {/* .map runs once PER ITEM in the array*/}
            {budgetsArray.map((budget) => (
                <div key={budget.id}>{budget.name}</div>
            ))}  
        </div>
    )
}

export default BudgetsPanel