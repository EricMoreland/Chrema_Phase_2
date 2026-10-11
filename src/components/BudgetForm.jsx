import { useState } from 'react';
import ExitButton from './ExitButton'; 
import { Bus, Car, Film, Home, MoreHorizontal, ShoppingCart, Utensils } from 'lucide-react'; 

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
    const categoryIcons = {
    Home,
    Groceries: ShoppingCart,
    Car,
    Food: Utensils,
    Entertainment: Film,
    Transport: Bus,
    Other: MoreHorizontal
}
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
            <h2 className="mx-auto mb-5 grid h-[72px] max-w-[290px] place-items-center rounded-[16px] bg-[#1d3040] font-serif text-2xl text-[#eee9de] shadow-[0_8px_20px_rgba(0,0,0,0.18)]">
            {isEditing ? 'Edit Budgets' : 'Add Budgets'}
            </h2>

            <form
                className="mx-auto w-full max-w-[510px] text-left"
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
                        min="0.01"
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