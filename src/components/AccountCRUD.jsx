const AccountCRUD = ({
  accountName,
  setAccountName,
  cashBalance,
  setCashBalance,
  onSubmit,
  onClose
}) => {

    function handleSubmit(event) {
    event.preventDefault()
    onSubmit(event)
  }

    return(
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
        <div className="mb-8 flex items-center justify-between">
          <h2 className="font-serif text-3xl text-[#eee9de]">
            Add Account
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close account form"
            className="text-2xl text-slate-300 hover:text-white"
          >
            ×
          </button>
        </div>

        <input
          aria-label="Account Name"
          type="text"
          value={accountName}
          onChange={(event) => setAccountName(event.target.value)}
          placeholder="For example, FNB Account"
          required
          autoFocus
          className="mb-5 w-full rounded-lg border border-slate-500 bg-slate-700 p-3 text-white outline-none placeholder:text-slate-400 focus:border-sky-400"
        />

        <input
          aria-label="Cash Balance"
          type="number"
          min="0"
          step="0.01"
          value={cashBalance}
          onChange={(event) => setCashBalance(event.target.value)}
          placeholder="For example, 1298"
          required
          className="w-full rounded-lg border border-slate-500 bg-slate-700 p-3 text-white outline-none placeholder:text-slate-400 focus:border-sky-400"
        />

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
            className="rounded-lg bg-sky-600 px-5 py-3 font-serif text-white hover:bg-sky-500"
            
          >
            Save Account
          </button>
        </div>
      </form>
    </div>
    )
}

export default AccountCRUD