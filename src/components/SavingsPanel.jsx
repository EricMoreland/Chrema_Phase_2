function SavingsPanel() {
    const savingsGoals = [
        {id: 1, name: 'Emergency fund'}
    ]

    return (
        <div>
            <h3>Saving Goals</h3>
            {/* .map runs once PER ITEM in the array, 'key=' isn't required for it to work but needed later when changes happen*/}
            {savingsGoals.map((goal) => (
                <div key={goal.id}>{goal.name}</div>
            ))}  
        </div>
    )
}

export default SavingsPanel