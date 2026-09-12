function SavingsPanel() {
    const savingsArray = [
        { id: 1, name: 'Emergency fund', spent: 350, max: 700 }
    ]

    return (
        <div>
            <h3>Saving Goals</h3>
            {/* .map runs once PER ITEM in the array*/}
            {savingsArray.map((goal) => {
                const percentSpent = (goal.spent / goal.max) * 100

                return (
                    <div key={goal.id}>
                        <div>{goal.name} - Spent R{goal.spent} / Max R{goal.max}</div>
                        <div className="progress_track">
                            <div className="progress_fill" style={{ width: `${percentSpent}%` }}></div>
                            {/*
                            -{} to run javascript inside style={} and get the variable declared at start.
                            -Style has to be inline css because it uses the calculated variable.
                            */}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default SavingsPanel