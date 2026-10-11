function SavingsPanel({ savingGoals }) {
    return (
        <div className="bg-[#172733] rounded-3xl p-8 min-h-[410px] min-w-[280px]">
            <h3 className="font-serif text-xl text-white mb-4">Saving Goals</h3>
            {/* .map runs once PER ITEM in the array*/}
            {savingGoals.map((goal) => {
                const percentComplete = (goal.currentAmount / goal.targetAmount) * 100

                return (
                    <div key={goal.id} className="mb-4">
                        <div className="text-slate-300 text-sm mb-1 font-serif">
                            {goal.name} - R{goal.currentAmount} / R{goal.targetAmount}
                        </div>
                        <div className="bg-slate-600 rounded-full h-2 w-full overflow-hidden">
                            <div className="bg-sky-500 h-full" style={{ width: `${percentComplete}%` }}></div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default SavingsPanel