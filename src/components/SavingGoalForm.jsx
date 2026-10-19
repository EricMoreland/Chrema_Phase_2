import { useState } from 'react'
import ExitButton from './ExitButton'

function SavingGoalForm({
    savingGoal,
    accountId,
    onAddSavingGoal,
    onUpdateSavingGoal,
    onClose,
    isUpdateProgress = false
}) {
    const [name, setName] = useState(savingGoal?.name ?? '')
    const [amount, setAmount] = useState(
        savingGoal
            ? String(isUpdateProgress ? '' : savingGoal.targetAmount)
            : ''
    )
    const [startDate, setStartDate] = useState(savingGoal?.startDate ?? '')
    const [endDate, setEndDate] = useState(savingGoal?.endDate ?? '')
    const isEditing = savingGoal != null

    async function handleSubmit(event) {
        event.preventDefault()

        const goalDetails = isUpdateProgress
            ? {
                kind: 'savings',
                amount: Number(amount),
                accountId
            }
            : {
                name: name.trim(),
                targetAmount: Number(amount),
                startDate,
                endDate,
                accountId
            }

        const succeeded = isEditing
            ? await onUpdateSavingGoal(savingGoal.id, goalDetails)
            : await onAddSavingGoal(goalDetails)

        if (succeeded) {
            onClose()
        }
    }

    return (
        <div className="min-h-[440px] p-8 text-left">
            <h2 className="mx-auto mb-5 grid h-[72px] max-w-[290px] rounded-[16px] bg-[#1d3040] place-items-center font-serif text-2xl text-[#eee9de] shadow-[0_8px_20px_rgba(0,0,0,0.18)]">
                {isUpdateProgress
                    ? 'Update Saving Goal Progress'
                    : isEditing
                        ? 'Edit Saving Goal'
                        : 'Add Saving Goal'}
            </h2>

            <form
                className="mx-auto w-full max-w-[510px] text-left"
                onSubmit={handleSubmit}
            >
                {!isUpdateProgress && (
                    <div className="mb-4">
                    <label
                        htmlFor="saving-goal-name"
                        className="mb-2 block font-serif text-base text-[#eee9de]"
                    >
                        Goal Name
                    </label>
                    <input
                        id="saving-goal-name"
                        type="text"
                        required
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder="e.g. Emergency fund"
                        className="w-full rounded-[10px] border border-slate-600 bg-[#263747] px-3 py-2 text-[#eee9de] outline-none focus:border-sky-400"
                    />
                    </div>
                )}

                <div className="mb-4">
                    <label
                        htmlFor="saving-goal-amount"
                        className="mb-2 block font-serif text-base text-[#eee9de]"
                    >
                        {isUpdateProgress ? 'Update amount (R)' : 'Target amount (R)'}
                    </label>
                    <input
                        id="saving-goal-amount"
                        type="number"
                        min="0.01"
                        step="0.01"
                        required
                        value={amount}
                        onChange={(event) => setAmount(event.target.value)}
                        className="w-full rounded-[10px] border border-slate-600 bg-[#263747] px-3 py-2 text-[#eee9de] outline-none focus:border-sky-400"
                    />
                </div>

                {!isUpdateProgress && (
                    <div className="mb-4">
                    <label
                        htmlFor="saving-goal-start"
                        className="mb-2 block font-serif text-base text-[#eee9de]"
                    >
                        Start date
                    </label>
                    <input
                        id="saving-goal-start"
                        type="date"
                        required
                        value={startDate}
                        onChange={(event) => setStartDate(event.target.value)}
                        className="w-full rounded-[10px] border border-slate-600 bg-[#263747] px-3 py-2 text-[#eee9de] outline-none focus:border-sky-400"
                    />
                    </div>
                )}

                {!isUpdateProgress && (
                    <div className="mb-4">
                    <label
                        htmlFor="saving-goal-end"
                        className="mb-2 block font-serif text-base text-[#eee9de]"
                    >
                        End date
                    </label>
                    <input
                        id="saving-goal-end"
                        type="date"
                        min={startDate}
                        required
                        value={endDate}
                        onChange={(event) => setEndDate(event.target.value)}
                        className="w-full rounded-[10px] border border-slate-600 bg-[#263747] px-3 py-2 text-[#eee9de] outline-none focus:border-sky-400"
                    />
                    </div>
                )}

                <div className="mt-8 flex gap-6">
                    <button
                        type="submit"
                        className="flex-1 rounded-[10px] bg-[#2e6f8e] px-4 py-3 font-serif text-lg text-[#eee9de] hover:bg-[#3b8cae]"
                    >
                        {isUpdateProgress
                            ? 'Update progress'
                            : isEditing
                                ? 'Save changes'
                                : 'Save goal'}
                    </button>
                    <ExitButton onExit={onClose} />
                </div>
            </form>
        </div>
    )
}

export default SavingGoalForm
