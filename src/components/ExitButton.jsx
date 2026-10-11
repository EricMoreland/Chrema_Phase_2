function ExitButton({ onExit}) {
    return (
        <button
        type = "button"
        onClick = {onExit}
        className = "rounded-lg border border-slate-500 px-3 py-2 text-sm  text-slate-200"
        >
            Cancel
        </button>
    )
}

export default ExitButton 