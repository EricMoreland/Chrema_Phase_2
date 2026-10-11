import { useState } from 'react'
import {
    Bus,
    Car,
    Film,
    Home,
    MoreHorizontal,
    Plus,
    ShoppingCart,
    Utensils
} from 'lucide-react'

const categoryIcons = {
    Home,
    Groceries: ShoppingCart,
    Car,
    Food: Utensils,
    Entertainment: Film,
    Transport: Bus,
    Other: MoreHorizontal
}

function BudgetsPanel({
    budgets,
    onRequestAdd,
    onRequestEdit,
    onRequestDelete
}) 
 {     const [openMenuBudgetId, setOpenMenuBudgetId] = useState(null)
    return (
        <div className="flex h-[490px] min-w-[280px] flex-col rounded-3xl bg-[#172733] p-8">
           <div className="mb-5 shrink-0">
    <h3 className="text-center font-serif text-xl uppercase tracking-wide text-[#eee9de]">
        Budgets
    </h3>
      <div className="mt-5 border-t border-[#64717a]" />
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto pr-2">

            {/* .map runs once PER ITEM in the array*/}
            {budgets.length === 0 ? (
    <p className="rounded-2xl border border-slate-600 bg-[#0d1720] p-4 text-left text-sm text-slate-300">
        No budgets yet. Select the plus button below to create one.
    </p>
) : (
    budgets.map((budget) => {
       
        const percentBudget = budget.limit > 0
        ? Math.min((budget.currentAmount / budget.limit) * 100, 100)
        : 0
        const CategoryIcon = categoryIcons[budget.category] ?? MoreHorizontal

        return (
            <div
                key={budget.id}
                className="relative mb-6 grid min-h-[76px] grid-cols-[40px_minmax(0,1fr)_28px] items-center gap-3"
            >
                <div className="grid size-9 place-items-center rounded-full bg-[#263747] text-[#eee9de]">
                    <CategoryIcon size={20} aria-hidden="true" />
                </div>

                <div className="min-w-0 font-serif text-sm text-[#eee9de]">
                    <p className="mb-1 truncate text-center">
                         {budget.name || budget.category}
                   </p>
                    <div
                        className="h-3 w-full overflow-hidden rounded-full bg-[#eee9de]"
                        role="progressbar"
                        aria-label={`${budget.category} budget spent`}
                        aria-valuenow={Math.min(budget.currentAmount, budget.limit)}
                        aria-valuemin={0}
                        aria-valuemax={budget.limit}
                    >
                        <div
                            className="h-full rounded-full bg-[#2e6f8e]"
                            style={{ width: `${percentBudget}%` }}
                        />
                    </div>
                    <div className="mt-1 flex justify-between gap-2 whitespace-nowrap text-xs text-slate-300">
                        <span>Spent: R{budget.currentAmount}</span>
                        <span>Max: R{budget.limit}</span>
                    </div>
                </div>

                <button
                    type="button"
                    aria-label={`Actions for ${budget.category} budget`}
                    aria-haspopup="menu"
                    aria-expanded={openMenuBudgetId === budget.id}
                    onClick={() =>
                        setOpenMenuBudgetId(
                            openMenuBudgetId === budget.id ? null : budget.id
                        )
                    }
                    className="grid size-7 place-items-center rounded-full border border-slate-500 text-slate-200 hover:bg-[#263747]"
                >
                    <MoreHorizontal size={18} aria-hidden="true" />
                </button>

                {openMenuBudgetId === budget.id && (
                    <div
                        role="menu"
                        className="absolute right-0 top-full z-10 mt-1 min-w-28 rounded-lg border border-slate-600 bg-[#1d3040] p-1 shadow-xl"
                    >
                        <button
                            type="button"
                            role="menuitem"
                            onClick={() => {
                                setOpenMenuBudgetId(null)
                                onRequestEdit(budget)
                            }}
                            className="block w-full rounded px-3 py-2 text-left text-sm text-[#eee9de] hover:bg-[#263747]"
                        >
                            Edit
                        </button>
                        <button
                            type="button"
                            role="menuitem"
                            onClick={() => {
                                setOpenMenuBudgetId(null)
                                onRequestDelete(budget.id)
                            }}
                            className="block w-full rounded px-3 py-2 text-left text-sm text-red-300 hover:bg-[#263747]"
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>
        )
    })
)}
    </div>
    <div className="flex shrink-0 justify-center pt-2">
    <button
        type="button"
        aria-label="Add budget"
        onClick={onRequestAdd}
        className="grid size-12 place-items-center rounded-full text-[#eee9de] hover:bg-[#263747] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
    >
        <Plus size={34} aria-hidden="true" />
    </button>
</div>
        </div>
    )
}

export default BudgetsPanel




