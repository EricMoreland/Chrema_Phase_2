import { useState } from 'react';
import ExitButton from './ExitButton'; 

function BudgetForm({
    budget,
    budgetCategories,
    onAddBudget,
    onUpdateBudget,
    onClose
}) {
    const [category, setCategory] = useState(budget?.category ?? 'Groceries')
    const [limit, setLimit] = useState(
        budget ? String(budget.limit) : ''
    )
    const isEditing = budget != null

    function handleSubmit(event) {
        event.preventDefault()

        const numericLimit = Number(limit)

        if (isEditing) {
            onUpdateBudget(budget.id, category, numericLimit)
        } else {
            onAddBudget(category, numericLimit)
        }

        onClose()
    }

        return (
        <div className="min-h-[440px] p-8 text-left">
            <h2 className="mb-6 font-serif text-2xl text-white">
                {isEditing ? 'Edit Budget' : 'Add Budget'}
            </h2>

            <form
                className="mb-4 rounded-2xl border border-slate-600 bg-[#0d1720] p-4 text-left"
                onSubmit={handleSubmit}
            >
                <h4 className="mb-4 font-serif text-lg text-white">
                    {isEditing ? 'Edit budget' : 'Create budget'}
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
                        value={category}
                        onChange={(event) => setCategory(event.target.value)}
                        className="w-full rounded-lg border border-slate-500 bg-[#172733] p-2 text-slate-200"
                    >
                        {budgetCategories.map((item) => (
                            <option key={item} value={item}>
                                {item}
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
                        value={limit}
                        onChange={(event) => setLimit(event.target.value)}
                        className="w-full rounded-lg border border-slate-500 bg-[#172733] p-2 text-slate-200"
                    />
                </div>

                <div className="flex gap-2">
                    <button
                        type="submit"
                        className="rounded-lg border border-slate-500 px-3 py-2 text-sm text-slate-200"
                    >
                        {isEditing ? 'Save changes' : 'Save budget'}
                    </button>
                    <ExitButton onExit={onClose} />
                </div>
            </form>
        </div>
    )
}

export default BudgetForm