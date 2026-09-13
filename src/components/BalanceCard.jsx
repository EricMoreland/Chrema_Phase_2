function BalanceCard({ balance }) {
    return (
        <div className="card">
            <p className="balance_label">Available Balance</p>
            <p className="balance_amount">R {balance}</p>
        </div>
    )
}

export default BalanceCard