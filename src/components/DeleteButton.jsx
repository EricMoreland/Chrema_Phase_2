function DeleteButton({ onDelete}) {
    return (
        <button
          type = "button"
          onClick = {onDelete}
          className = "rounded-lg border border-red-400 px-3 py-2 text-sm text-red-300"
          >
            Delete budget
          </button>
    )
}

export default DeleteButton