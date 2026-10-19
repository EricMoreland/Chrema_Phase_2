import { useState } from 'react'
import { MoreHorizontal, Plus, Wallet } from 'lucide-react'

function SavingsPanel({
    savingGoals,
    onRequestAdd,
    onRequestEdit,
    onRequestDelete,
    onRequestUpdateProgress
}) {
    const [openMenuGoalId, setOpenMenuGoalId] = useState(null)

    return (
        <div className="flex h-[490px] min-w-[280px] flex-col rounded-3xl bg-[#172733] p-8">
            <div className="mb-5 shrink-0">
                <h3 className="text-center font-serif text-xl uppercase tracking-wide text-[#eee9de]">
                    Saving Goals
                </h3>
                <div className="mt-5 border-t border-[#64717a]" />
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto pr-2">
                {savingGoals.length === 0 ? (
                    <p className="rounded-2xl border border-slate-600 bg-[#0d1720] p-4 text-left text-sm text-slate-300">
                        No saving goals yet. Select the plus button below to create one.
                    </p>
                ) : (
                    savingGoals.map((goal) => {
                        const targetAmount = Number(goal.targetAmount)
                        const currentAmount = Number(goal.currentAmount)
                        const percentComplete = targetAmount > 0
                            ? Math.min((currentAmount / targetAmount) * 100, 100)
                            : 0

                        return (
                            <div
                                key={goal.id}
                                className="relative mb-6 grid min-h-[76px] grid-cols-[40px_minmax(0,1fr)_28px] items-center gap-3"
                            >
                                <div className="grid size-9 place-items-center rounded-full bg-[#263747] text-[#eee9de]">
                                    <Wallet size={20} aria-hidden="true" />
                                </div>

                                <div className="min-w-0 font-serif text-sm text-[#eee9de]">
                                    <p className="mb-1 truncate text-center">
                                        {goal.name}
                                    </p>
                                    <div
                                        className="h-3 w-full overflow-hidden rounded-full bg-[#eee9de]"
                                        role="progressbar"
                                        aria-label={`${goal.name} saving goal progress`}
                                        aria-valuenow={Math.min(currentAmount, targetAmount)}
                                        aria-valuemin={0}
                                        aria-valuemax={targetAmount}
                                    >
                                        <div
                                            className="h-full rounded-full bg-[#2e6f8e]"
                                            style={{ width: `${percentComplete}%` }}
                                        />
                                    </div>
                                    <div className="mt-1 flex justify-between gap-2 whitespace-nowrap text-xs text-[#eee9de]">
                                        <span>Saved: R{currentAmount}</span>
                                        <span>Goal: R{targetAmount}</span>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    aria-label={`Actions for ${goal.name} saving goal`}
                                    aria-haspopup="menu"
                                    aria-expanded={openMenuGoalId === goal.id}
                                    onClick={() =>
                                        setOpenMenuGoalId(
                                            openMenuGoalId === goal.id ? null : goal.id
                                        )
                                    }
                                    className="grid size-7 place-items-center rounded-full border border-slate-500 text-slate-200 hover:bg-[#263747]"
                                >
                                    <MoreHorizontal size={18} aria-hidden="true" />
                                </button>

                                {openMenuGoalId === goal.id && (
                                    <div
                                        role="menu"
                                        className="absolute right-0 top-full z-10 mt-1 min-w-28 rounded-lg border border-slate-600 bg-[#1d3040] p-1 shadow-xl"
                                    >
                                        <button
                                            type="button"
                                            role="menuitem"
                                            onClick={() => {
                                                setOpenMenuGoalId(null)
                                                onRequestUpdateProgress(goal)
                                            }}
                                            className="block w-full rounded px-3 py-2 text-left text-sm text-[#eee9de] hover:bg-[#263747]"
                                        >
                                            Update progress
                                        </button>
                                        <button
                                            type="button"
                                            role="menuitem"
                                            onClick={() => {
                                                setOpenMenuGoalId(null)
                                                onRequestEdit(goal)
                                            }}
                                            className="block w-full rounded px-3 py-2 text-left text-sm text-[#eee9de] hover:bg-[#263747]"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            type="button"
                                            role="menuitem"
                                            onClick={() => {
                                                setOpenMenuGoalId(null)
                                                onRequestDelete(goal.id)
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
                    aria-label="Add saving goal"
                    onClick={onRequestAdd}
                    className="grid size-12 place-items-center rounded-full text-[#eee9de] hover:bg-[#263747] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
                >
                    <Plus size={34} aria-hidden="true" />
                </button>
            </div>
        </div>
    )
}

export default SavingsPanel
