import DeleteButton from "./DeleteButton";
import ExitButton from "./ExitButton";

function DeleteBudget({ onDelete, onExit}) {
    return (
        <div className = "min-h-[440px] p-8 text-left">
            <h2 className = "font-serif text-2xl text-white">Delete Budget?</h2>
            <p className = "mt-2 text-sm text-slate-300">
                This will remove the budget from the list
            </p>
            <div className = "mt-4 flex gap-2">
                <DeleteButton onDelete={onDelete} />
                <ExitButton onExit={onExit} />
            </div>
        </div>
    )
}