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
    setTransactionKind
}) {
    return (
        <>
            <div className="account_bar">
                <button
                    className={transactionKind === 'income' ? 'active' : ''}
                    onClick={() => setTransactionKind('income')}
                >
                    Income
                </button>
                <button
                    className={transactionKind === 'expense' ? 'active' : ''}
                    onClick={() => setTransactionKind('expense')}
                >
                    Expense
                </button>
            </div>

            <div className="category_buttons">
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
            </div>
        </>
    )
}

export default TransactionForm