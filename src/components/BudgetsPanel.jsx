function BudgetsPanel() {
    const budgetsArray = [
        {id: 1, name: 'Food', spent: 400, max: 850}
    ]

    return (
        <div>
            <h3>Budgets</h3>
            {/* .map runs once PER ITEM in the array*/}
            {budgetsArray.map((budget) => {
                const percentbudget = (budget.spent / budget.max) * 100

                return (
                <div key={budget.id}>
                    <div>{budget.name} - Spent R{budget.spent} / Max R{budget.max}</div>
                    <div className="progress_track">
                        <div className="progress_fill" style={{width: `${percentbudget}%`}}></div>
                    </div>
                </div>
                )
            })}
        </div>
    )
}

export default BudgetsPanel