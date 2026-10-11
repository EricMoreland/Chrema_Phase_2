function EditButton({ budget, onEdit }) {
    return (
    <button
     type= "button"
     onClick= {() => onEdit(budget)}
     className= "rounded-lg border border-slate-500 px-3 py-2 text-sm text-slate-200"
    >
        Edit
        </button>
    )
}

export default EditButton