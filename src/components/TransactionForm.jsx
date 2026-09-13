function TransactionForm({
    newDescription,
    setNewDescription,
    newAmount,
    setNewAmount,
    handleAddTransactionProp
}) {
    return (
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

            <button onClick={handleAddTransactionProp}>Add Transaction</button>
        </div>
    )
}

export default TransactionForm