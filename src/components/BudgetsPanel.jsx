function BudgetsPanel({ budgets }) {
    return (
        <div className="bg-slate-800 rounded-3xl p-8 min-h-[410px] min-w-[280px]">
            <h3 className="font-serif text-xl text-white mb-4">Budgets</h3>
            {/* .map runs once PER ITEM in the array*/}
            {budgets.map((budget) => {
                const percentbudget = (budget.currentAmount / budget.max) * 100

                return (
                    <div key={budget.id} className="mb-4">
                        <div className="text-slate-300 text-sm mb-1 font-serif">
                            {budget.name} - Spent R{budget.currentAmount} / Max R{budget.max}
                        </div>
                        <div className="bg-slate-600 rounded-full h-2 w-full overflow-hidden">
                            <div className="bg-sky-500 h-full" style={{ width: `${percentbudget}%` }}></div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default BudgetsPanel