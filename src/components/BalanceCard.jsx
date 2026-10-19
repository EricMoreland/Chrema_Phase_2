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
    newDate,
    setNewDate,
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
            <TransactionForm
                newDescription={newDescription}
                setNewDescription={setNewDescription}
                newAmount={newAmount}
                setNewAmount={setNewAmount}
                newDate={newDate}
                setNewDate={setNewDate}
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
        <div className="relative min-h-[300px] w-full text-center">
            <div className="relative mx-auto mt-25 flex h-[154px] max-w-[573px] flex-col items-center justify-center overflow-hidden rounded-[58px] border border-white/5 bg-[#1b2d3b]/80">
            <p className="font-serif text-2xl tracking-wide uppercase text-[#e8e1d3]">Available Balance</p>
            <p className="text-7xl font-serif text-[#e8e1d3] mb-5">R {balance}</p>
            </div>
                               
            <div className="mx-auto mt-16 flex h-[55px] max-w-[503px] items-center rounded-full bg-[#2e6f8e] px-6 text-white shadow-[0_8px_20px_rgba(0,0,0,0.12)] transition hover:bg-[#3b8cae]">
                <button 
                onClick={onOpenTransaction}
                className="flex w-full items-center justify-center gap-4 font-serif text-[15px] uppercase tracking-wide text-[#e8e1d3]"
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