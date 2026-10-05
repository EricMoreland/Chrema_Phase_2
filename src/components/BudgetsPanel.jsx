function BudgetsPanel({ budgets }) {
    return (
        <div className="bg-[#172733] rounded-3xl p-8 min-h-[410px] min-w-[280px]">
           <div className="mb-4 flex items-center justify-between gap-4">
            <h3 className="font-serif text-xl text-white">Budgets</h3>
            <button
              type="button"
              className="rounded-lg border border-slate-500 px-3 py-2 text-sm text-slate-200"
              >
                Add Budget
              </button>
           </div>
            {/* .map runs once PER ITEM in the array*/}
            {budgets.map((budget) => {
                const percentbudget = (budget.currentAmount / budget.limit) * 100

                return (
    <div key={budget.id} className="mb-4 rounded-2xl border border-slate-600 bg-[#0d1720] p-4">
        <div className="mb-3">
    <div className="mb-3 min-w-0 text-slate-300 text-sm font-serif">
        <p className="break-words">{budget.category}</p>
        <p className="mt-1">
            Spent R{budget.currentAmount} / Max R{budget.limit}
        </p>
    </div>

    <div className="flex gap-2">
        <button
            type="button"
            className="rounded-lg border border-slate-500 px-3 py-2 text-sm text-slate-200"
        >
            Edit
        </button>
        <button
            type="button"
            className="rounded-lg border border-red-400 px-3 py-2 text-sm text-red-300"
        >
            Delete
        </button>
    </div>
  </div>

        <div className="bg-slate-600 rounded-full h-2 w-full overflow-hidden">
            <div
                className="bg-sky-500 h-full"
                style={{ width: `${percentbudget}%` }}
            ></div>
        </div>
    </div>
)
            })}
        </div>
    )
}

export default BudgetsPanel