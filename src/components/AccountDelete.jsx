function AccountDelete({
  accountName,
  onConfirm,
  onClose
}) {
  function handleSubmit(event) {
    event.preventDefault()
    onConfirm()
  }

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose()
        }
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-3xl border border-slate-500 bg-[#172733] p-6 text-left shadow-2xl"
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-serif text-2xl text-white">
            Delete Account
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close delete account form"
            className="text-2xl text-slate-300 hover:text-white"
          >
            ×
          </button>
        </div>

        <p className="text-slate-200">
          Are you sure you want to delete{' '}
          <strong className="text-white">{accountName}</strong>?
        </p>

        <p className="mt-3 text-sm text-slate-400">
          This action cannot be undone.
        </p>

        <div className="mt-8 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-slate-700 px-5 py-3 text-slate-200 hover:bg-slate-600"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="rounded-lg bg-red-700 px-5 py-3 text-white hover:bg-red-600"
          >
            Delete Account
          </button>
        </div>
      </form>
    </div>
  )
}

export default AccountDelete