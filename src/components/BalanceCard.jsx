import TransactionForm from "./TransactionForm"

function BalanceCard({
    balance,
    showTransactionForm,
    setShowTransactionForm,
    newDescription,
    setNewDescription,
    newAmount,
    setNewAmount,
    handleAddTransactionProp,
    transactions,
    newCategory,
    setNewCategory,
    categories,
    transactionKind,
    setTransactionKind
}) {

    return (
        <div className="bg-slate-800 rounded-3xl p-8 text-center">
            <p className="text-slate-400 text-sm tracking-widest uppercase mb-2">Available Balance</p>
            <p className="text-6xl font-serif text-white mb-8">R {balance}</p>

            <button onClick={() => setShowTransactionForm(true)}>
                + Add Transaction
            </button>

            {showTransactionForm && (
            <TransactionForm
                newDescription={newDescription}
                setNewDescription={setNewDescription}
                newAmount={newAmount}
                setNewAmount={setNewAmount}
                handleAddTransactionProp={handleAddTransactionProp}
                newCategory={newCategory}
                setNewCategory={setNewCategory}
                categories={categories}
                transactionKind={transactionKind}
                setTransactionKind={setTransactionKind}
                onClose={() => setShowTransactionForm(false)} //form closes when 
            />
            )}


            {transactions.length > 0 && (
                <p>
                    Recent: {transactions[transactions.length - 1].description} - R
                    {transactions[transactions.length - 1].amount}
                    ({transactions[transactions.length - 1].type})
                    ({transactions[transactions.length - 1].category})
                </p>
            )}
        </div>
    )
}

export default BalanceCard