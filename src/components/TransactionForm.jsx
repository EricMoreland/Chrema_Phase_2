function TransactionForm({
    newDescription,
    setNewDescription,
    newAmount,
    setNewAmount,
    handleAddTransactionProp,
    newCategory,
    setNewCategory,
    categories,
    transactionKind,
    setTransactionKind,
    onClose
}) {
    return (
        <>
            <div className="mb-5 flex gap-2">
                <button
                    className={`flex-1 rounded-full px-4 py-2 font-serif ${
                        transactionKind === 'income'
                            ? 'bg-sky-600 text-white'
                            : 'bg-slate-700 text-slate-300'
                    }`}
                    onClick={() => setTransactionKind('income')}
                >
                    Income
                </button>
                <button
                    className={`flex-1 rounded-full px-4 py-2 font-serif ${
                        transactionKind === 'expense'
                            ? 'bg-sky-600 text-white'
                            : 'bg-slate-700 text-slate-300'
                    }`}
                    onClick={() => setTransactionKind('expense')}
                >
                    Expense
                </button>
            </div>

            <div className="mb-6 flex flex-wrap justify-center gap-2">
                {categories.map((category) => {
                    return (
                        <button
                            key={category}
                            className={newCategory === category ? 'active' : ''}
                            onClick={() => setNewCategory(category)}
                        >
                            {category}
                        </button>
                    )
                })}
            </div>
            <div>
                <input
                    type='text'
                    placeholder='Description'
                    value={newDescription}
                    //event = info about what just happend in the input box (here: the new text typed)
                    onChange={(event) => setNewDescription(event.target.value)} //event.target = the input box, .value = its current text
                /> {/*type a letter, onChange execute -> setNewDescription updates state -> react makes value={newDescription} */}

                <input
                    type='number'
                    placeholder='Amount'
                    value={newAmount}
                    onChange={(event) => setNewAmount(event.target.value)}
                />
            </div>
            <div>
                <button onClick={handleAddTransactionProp}>Add Transaction</button>
                <button onClick={onClose}>Close</button>
            </div>
        </>
    )
}

export default TransactionForm