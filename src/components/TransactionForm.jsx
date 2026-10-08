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
}){


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
                            className={`rounded-full px-4 py-2 font-serif text-sm ${
                                newCategory === category
                                    ? 'bg-sky-600 text-white'
                                    : 'bg-slate-700 text-slate-300'
                            }`}
                            onClick={() => setNewCategory(category)}
                        >
                            {category}
                        </button>
                    )
                })}
            </div>
            <div className="mx-auto w-full max-w-[650px]">
                <input
                    type='text'
                    placeholder='Transaction name'
                    value={newDescription}
                    //event = info about what just happend in the input box (here: the new text typed)
                    onChange={(event) => setNewDescription(event.target.value)} //event.target = the input box, .value = its current text
                    className="mb-4 w-full rounded-xl border border-slate-600 bg-slate-800 px-5 py-4 text-white outline-none"
               /> {/*type a letter, onChange execute -> setNewDescription updates state -> react makes value={newDescription} */}

                <input
                    type='number'
                    placeholder='Transaction Amount'
                    value={newAmount}
                    onChange={(event) => setNewAmount(event.target.value)}
                    className="mb-4 w-full rounded-xl border border-slate-600 bg-slate-800 px-5 py-4 text-white outline-none"
                />
                <label className =" mb-3 block  font-serif text-center text-slate-300">
                Date
                </label>
                
                <input 
                type = 'date'
                className = " mb-6 w-full rounded-xl border border-slate-600 bg-slate-800 px-5 py-4 text-white outline-none" /> 
            </div>
            <div className="flex justify-center gap-2">
                <button onClick={handleAddTransactionProp}
                className="flex-1 rounded-full bg-sky-600 px-4 py-3 font-serif text-white"
                > 
                Save
                 </button>

                <button onClick={onClose}
                className="rounded-full bg-slate-700 px-5 py-3 font-serif text-slate-300"
                > Cancel  
                </button>
            </div>
        </>
    )
}

export default TransactionForm