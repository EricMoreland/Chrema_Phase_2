import { useState } from 'react'
import EditButton from './EditButton'
import {
    Bus,
    Car,
    Film,
    Home,
    MoreHorizontal,
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
        <div className="bg-[#172733] rounded-3xl p-8 min-h-[410px] min-w-[280px]">
           <div className="mb-4 flex items-center justify-between gap-4">
            <h3 className="font-serif text-xl text-white">Budgets</h3>
            <button
             type="button"
             onClick={onRequestAdd}
             className="rounded-lg border border-slate-500 px-3 py-2 text-sm text-slate-200"
           >
             Add Budget
           </button>
           </div>

        <div className="max-h-[60vh] overflow-y-auto pr-2">

            {/* .map runs once PER ITEM in the array*/}
            {budgets.length === 0 ? (
    <p className="rounded-2xl border border-slate-600 bg-[#0d1720] p-4 text-left text-sm text-slate-300">
        No budgets yet. Select “Add Budget” to create one.
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
                className="relative mb-5 grid grid-cols-[40px_minmax(0,1fr)_28px] items-center gap-3"
            >
                <div className="grid size-9 place-items-center rounded-full bg-[#263747] text-[#eee9de]">
                    <CategoryIcon size={20} aria-hidden="true" />
                </div>

                <div className="min-w-0 font-serif text-sm text-[#eee9de]">
                    <p className="mb-1 truncate text-center">{budget.category}</p>
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
                    <div className="mt-1 flex justify-between gap-2 text-xs text-slate-300">
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
        </div>
    )
}

export default BudgetsPanel




