function SavingsPanel() {
    const savingsArray = [
        {id: 1, name: 'Emergency fund'}
    ]

    return (
        <div>
            <h3>Saving Goals</h3>
            {/* .map runs once PER ITEM in the array*/}
            {savingsArray.map((goal) => (
                <div key={goal.id}>{goal.name}</div>
            ))}  
        </div>
    )
}

export default SavingsPanel