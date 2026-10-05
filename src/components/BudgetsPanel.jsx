import { useState } from 'react'

function BudgetsPanel({ budgets }) {
    const budgetCategories = [
        'Home',
        'Groceries',
        'Car',
        'Food',
        'Entertainment',
        'Transport',
        'Other'
    ]

    const [showAddForm, setShowAddForm] = useState(false)
    const [newBudgetCategory, setNewBudgetCategory] = useState('Groceries')
    const [newBudgetLimit, setNewBudgetLimit] = useState('')

    return (
        <div className="bg-[#172733] rounded-3xl p-8 min-h-[410px] min-w-[280px]">
           <div className="mb-4 flex items-center justify-between gap-4">
            <h3 className="font-serif text-xl text-white">Budgets</h3>
            <button
              type="button"
              onClick={() => setShowAddForm(true)} 
              className="rounded-lg border border-slate-500 px-3 py-2 text-sm text-slate-200"
              >
                Add Budget
              </button>
           </div>

           {showAddForm && (
    <form
        className="mb-4 rounded-2xl border border-slate-600 bg-[#0d1720] p-4 text-left"
        onSubmit={(event) => event.preventDefault()}
    >
        <h4 className="mb-4 font-serif text-lg text-white">
            Create budget
        </h4>

        <div className="mb-4">
            <label
                htmlFor="new-budget-category"
                className="mb-1 block text-sm text-slate-300"
            >
                Category
            </label>
            <select
                id="new-budget-category"
                value={newBudgetCategory}
                onChange={(event) => setNewBudgetCategory(event.target.value)}
                className="w-full rounded-lg border border-slate-500 bg-[#172733] p-2 text-slate-200"
            >
                {budgetCategories.map((category) => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>
        </div>

        <div className="mb-4">
            <label
                htmlFor="new-budget-limit"
                className="mb-1 block text-sm text-slate-300"
            >
                Monthly limit (R)
            </label>
            <input
                id="new-budget-limit"
                type="number"
                min="0"
                step="0.01"
                required
                value={newBudgetLimit}
                onChange={(event) => setNewBudgetLimit(event.target.value)}
                className="w-full rounded-lg border border-slate-500 bg-[#172733] p-2 text-slate-200"
            />
        </div>

        <div className="flex gap-2">
            <button
                type="submit"
                className="rounded-lg border border-slate-500 px-3 py-2 text-sm text-slate-200"
            >
                Save budget
            </button>
            <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="rounded-lg border border-slate-500 px-3 py-2 text-sm text-slate-200"
            >
                Cancel
            </button>
        </div>
    </form>
)}
            {/* .map runs once PER ITEM in the array*/}
            {budgets.length === 0 ? (
    <p className="rounded-2xl border border-slate-600 bg-[#0d1720] p-4 text-left text-sm text-slate-300">
        No budgets yet. Select “Add Budget” to create one.
    </p>
) : (
    budgets.map((budget) => {
        const percentbudget = (budget.currentAmount / budget.limit) * 100

        return (
            <div
                key={budget.id}
                className="mb-4 rounded-2xl border border-slate-600 bg-[#0d1720] p-4"
            >
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

                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-600">
                    <div
                        className="h-full bg-sky-500"
                        style={{ width: `${percentbudget}%` }}
                    ></div>
                </div>
            </div>
        )
    })
)}
        </div>
    )
}

export default BudgetsPanel





