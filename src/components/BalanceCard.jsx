import TransactionForm from "./TransactionForm"

function BalanceCard({
    balance,
    newDescription,
    setNewDescription,
    newAmount,
    setNewAmount,
    handleAddTransactionProp,
    transactions,

}) {

    return (
        <div className="card">
            <p className="balance_label">Available Balance</p>
            <p className="balance_amount">R {balance}</p>

            <TransactionForm
                newDescription={newDescription}
                setNewDescription={setNewDescription}
                newAmount={newAmount}
                setNewAmount={setNewAmount}
                handleAddTransactionProp={handleAddTransactionProp}
            />


            {transactions.length > 0 && (
                <p>
                    Recent: {transactions[transactions.length - 1].description} - R
                    {transactions[transactions.length - 1].amount} ({transactions[transactions.length - 1].type})
                </p>
            )}
        </div>
    )
}

export default BalanceCard