function ExitButton({ onExit}) {
    return (
        <button
        type = "button"
        onClick = {onExit}
        className="flex-1 rounded-[10px] bg-[#34333e] px-4 py-3 font-serif text-lg text-[#eee9de] hover:bg-[#44434f]"
        >
            Cancel
        </button>
    )
}

export default ExitButton 