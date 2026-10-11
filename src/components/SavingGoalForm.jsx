import { useState } from 'react';
import ExitButton from './ExitButton';

function SavingGoalForm({
    savingGoal,
    accountId,
    onAddSavingGoal,
    onUpdateSavingGoal,
    onClose
}) {
    const [name, setName] = useState(savingGoal?.name ?? '')
    const [targetAmount, setTargetAmount] = useState(
        savingGoal ? String(savingGoal.targetAmount) : ''
    )
    const [startDate, setStartDate] = useState(
        savingGoal?.startDate ?? ''
    )
    const [endDate, setEndDate] = useState(
        savingGoal?.endDate ?? ''
    )
    const isEditing = savingGoal != null

    async function handleSubmit(event) {
        event.preventDefault()

        const goalDetails = {
            name,
            targetAmount: Number(targetAmount),
            startDate,
            endDate,
            accountId
        }

        if (isEditing) {
        const updateSucceeded = await onUpdateSavingGoal(
            savingGoal.id,
            goalDetails
        )

        if (updateSucceeded) {
            onClose()
        }
    } else {
        const saveSucceeded = await onAddSavingGoal(goalDetails)

        if (saveSucceeded) {
            onClose()
        }
    }
}


    return (
        <div className="min-h-[440px] p-8 text-left">
            <h2 className="mb-6 font-serif text-2xl text-white">
                {isEditing ? 'Edit Saving Goal' : 'Add Saving Goal'}
            </h2>

            <form
                className="mb-4 rounded-2xl border border-slate-600 bg-[#0d1720] p-4 text-left"
                onSubmit={handleSubmit}
            >
                <div className="mb-4">
                    <label
                        htmlFor="saving-goal-name"
                        className="mb-1 block text-sm text-slate-300"
                    >
                        Goal name
                    </label>

                    <input
                        id="saving-goal-name"
                        type="text"
                        required
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        className="w-full rounded-lg border border-slate-500 bg-[#172733] p-2 text-slate-200"
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="saving-goal-target"
                        className="mb-1 block text-sm text-slate-300"
                    >
                        Target amount (R)
                    </label>

                    <input
                        id="saving-goal-target"
                        type="number"
                        min="0.01"
                        step="0.01"
                        required
                        value={targetAmount}
                        onChange={(event) => setTargetAmount(event.target.value)}
                        className="w-full rounded-lg border border-slate-500 bg-[#172733] p-2 text-slate-200"
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="saving-goal-start"
                        className="mb-1 block text-sm text-slate-300"
                    >
                        Start date
                    </label>

                    <input
                        id="saving-goal-start"
                        type="date"
                        required
                        value={startDate}
                        onChange={(event) => setStartDate(event.target.value)}
                        className="w-full rounded-lg border border-slate-500 bg-[#172733] p-2 text-slate-200"
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="saving-goal-end"
                        className="mb-1 block text-sm text-slate-300"
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
                        className="w-full rounded-lg border border-slate-500 bg-[#172733] p-2 text-slate-200"
                    />
                </div>

                <div className="flex gap-2">
                    <button
                        type="submit"
                        className="rounded-lg border border-slate-500 px-3 py-2 text-sm text-slate-200"
                    >
                        {isEditing ? 'Save changes' : 'Save goal'}
                    </button>

                    <ExitButton onExit={onClose} />
                </div>
            </form>
        </div>
    )
}

export default SavingGoalForm