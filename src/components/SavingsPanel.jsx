function SavingsPanel() {
    const savingsArray = [
        {id: 1, name: 'Emergency fund', spent: 350, max: 700}
    ]

    return (
        <div>
            <h3>Saving Goals</h3>
            {/* .map runs once PER ITEM in the array*/}
            {savingsArray.map((goal) => {
                const percentSpent = (goal.spent / goal.max) * 100
                
                return (
                    <div key={goal.id}>
                        {goal.name} - Spent R{goal.spent} / Max R{goal.max}
                    </div>
                )
            })}  
        </div>
    )
}

export default SavingsPanel