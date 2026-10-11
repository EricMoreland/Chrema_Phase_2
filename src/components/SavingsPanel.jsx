import EditButton from './EditButton'

function SavingsPanel({ 
    savingGoals, 
    onRequestAdd,
    onRequestEdit,
    onRequestDelete
}) 
 {
    return (
        <div className="bg-[#172733] rounded-3xl p-8 min-h-[410px] min-w-[280px]">
           <div className="mb-4 flex items-center justify-between gap-4">
            <h3 className="font-serif text-xl text-white">Saving Goals</h3>
            <button
          type="button"
          onClick={onRequestAdd}
          className="rounded-lg border border-slate-500 px-3 py-2 text-sm text-slate-200"
        >
          Add Goal
        </button>
      </div>

      {savingGoals.length === 0 ? (
        <p className="rounded-2xl border border-slate-600 bg-[#0d1720] p-4 text-left text-sm text-slate-300">
          No saving goals yet. Select “Add Goal” to create one.
        </p>
      ) : (
        <div className="max-h-[60vh] overflow-y-auto pr-2">
          {savingGoals.map((goal) => {
            const targetAmount = Number(goal.targetAmount)
            const currentAmount = Number(goal.currentAmount)

            const percentComplete =
              targetAmount > 0
                ? Math.min((currentAmount / targetAmount) * 100, 100)
                : 0

            return (
              <div
                key={goal.id}
                className="mb-4 rounded-2xl border border-slate-600 bg-[#0d1720] p-4"
              >
                <div className="mb-3">
                  <div className="min-w-0 text-left text-sm text-slate-300">
                    <p className="break-words font-serif">
                      {goal.name}
                    </p>

                    <p className="mt-1">
                      R{currentAmount} / R{targetAmount}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {goal.startDate} to {goal.endDate}
                    </p>
                  </div>

                  <div className="mt-3 flex gap-2">
                    <EditButton
                      budget={goal}
                      onEdit={onRequestEdit}
                    />

                    <button
                      type="button"
                      onClick={() => onRequestDelete(goal.id)}
                      className="rounded-lg border border-red-400 px-3 py-2 text-sm text-red-300"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-600">
                  <div
                    className="h-full bg-sky-500"
                    style={{ width: `${percentComplete}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default SavingsPanel