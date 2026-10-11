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
        

            <div className="mb-4">
                <label className="mb-2 block font-serif text-base text-[#eee9de]">
                  Category
                </label>
                <div className="flex flex-wrap gap-4">
                  {budgetCategories.map((item) => {
                    const CategoryIcon = categoryIcons[item] ?? MoreHorizontal

                     return (
                       <button
                           key={item}
                           type="button"
                           aria-label={item}
                           aria-pressed={category === item}
                           onClick={() => setCategory(item)}
                           className={`grid size-11 place-items-center rounded-[12px] border ${
                              category === item
                                ? 'border-[#eee9de] bg-[#2e6f8e] text-white'
                                : 'border-white/10 bg-[#263747] text-[#eee9de]'
                    }`}
                >
                    <CategoryIcon size={20} />
                </button>
            )
        })}
    </div>
</div>

                <div className="mb-4">
                    <label
                        htmlFor="new-budget-limit"
                        className="mb-2 block font-serif text-base text-[#eee9de]"
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
                        className="w-full rounded-[10px] border border-slate-600 bg-[#263747] px-3 py-2 text-[#eee9de] outline-none focus:border-sky-400"
                    />
                </div>

                <div className="mt-8 flex gap-6">
                    <button
                        type="submit"
                       className="flex-1 rounded-[10px] bg-[#2e6f8e] px-4 py-3 font-serif text-lg text-[#eee9de] hover:bg-[#3b8cae]"
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