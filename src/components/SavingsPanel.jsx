function SavingsPanel({ savingGoals }) {
    return (
        <div className="card">
            <h3>Saving Goals</h3>
            {/* .map runs once PER ITEM in the array*/}
            {savingGoals.map((goal) => {
                const percentComplete = (goal.currentAmount / goal.max) * 100

                return (
                    <div key={goal.id}>
                        <div>{goal.name} - R{goal.currentAmount} / R{goal.max}</div>
                        <div className="progress_track">
                            <div className="progress_fill" style={{ width: `${percentComplete}%` }}></div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default SavingsPanel