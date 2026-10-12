import DeleteButton from './DeleteButton'
import ExitButton from './ExitButton'

function DeleteSavingGoal({ onDelete, onExit }) {
    return (
        <div className="min-h-[440px] p-8 text-left">
            <h2 className="font-serif text-2xl text-white">Delete Saving Goal?</h2>
            <p className="mt-2 text-sm text-slate-300">
                This will remove the saving goal from the list
            </p>
            <div className="mt-4 flex gap-2">
                <DeleteButton onDelete={onDelete} />
                <ExitButton onExit={onExit} />
            </div>
        </div>
    )
}

export default DeleteSavingGoal
