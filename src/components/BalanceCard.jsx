import TransactionForm from "./TransactionForm"

function BalanceCard({
    balance,
    activeWorkspaceView,
    onOpenTransaction,
    onCloseView,
    //showTransactionForm,
    //setShowTransactionForm,
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

    const handleSaveTransaction = () => {
        handleAddTransactionProp()
        onCloseView()
    }

    if (activeWorkspaceView === 'add-transaction') {
        return (
            <div className="min-h-[440px] w-full rounded-[36px] bg-[#172733] p-8 text-center">
                <h2 className="mb-6 font-serif text-2xl text-white">
                    Add Transaction
                </h2>

            <TransactionForm
                newDescription={newDescription}
                setNewDescription={setNewDescription}
                newAmount={newAmount}
                setNewAmount={setNewAmount}
                handleAddTransactionProp={handleSaveTransaction}
                newCategory={newCategory}
                setNewCategory={setNewCategory}
                categories={categories}
                transactionKind={transactionKind}
                setTransactionKind={setTransactionKind}
                onClose={onCloseView}  
            />
            </div>
            )}

    return (
        <div className="min-h-[440px] w-full rounded-[36px] bg-[#172733] p-8 text-center">
            <p className="text-slate-400 font-serif text-sm tracking-widest uppercase mb-2">Available Balance</p>
            <p className="text-6xl font-serif text-white mb-8">R {balance}</p>

            <div className="flex flex-col items-center bg-sky-600 text-white rounded-4xl p-3 max-w-[500px] center mx-auto">
                <button 
                onClick={onOpenTransaction}
                className="font-serif uppercase text-slate-300 mt-4"
                >
                    + Add Transaction
                </button>
            </div>

            

            {transactions.length > 0 && (
                <p className="text-slate-400 font-serif text-sm tracking-widest uppercase mt-8">
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