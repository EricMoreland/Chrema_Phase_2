import { useState } from "react";
import AccountCRUD from "./AccountCRUD";

function AccountBar({ selectedType, setSelectedType, accounts, selectedAccountId, setSelectedAccountId, onAddAccount }) {
    const [showAccountForm, setShowAccountForm] = useState(false)
    const [accountName, setAccountName] = useState('')
    const [cashBalance, setCashBalance] = useState('')

    function handleSubmit(event) {
        event.preventDefault()

        const accountWasAdded = onAddAccount({
            name: accountName,
            cashBalance
        })

        if (!accountWasAdded) {
            return
        }

        setAccountName('')
        setCashBalance('')
        setShowAccountForm(false)
    }

    return (
        <div className="flex items-center gap-4 mb-6">
            <select
                value={selectedAccountId ?? ''} //while fetch runs and before accounts are loaded, selectedAccountId is null. ?? evaluate between null and '' and returns the first non-null value. 
                onChange={(e) => setSelectedAccountId(Number(e.target.value))} //value from selectedAccountId is a string
                className="bg-slate-800 text-white rounded-full px-5 py-2.5 font-serif tracking-wide"
            >
                {accounts.map((account) => (
                <option key={account.id} value={account.id}>{account.name}</option>
                ))}
            </select>

            <button
                type="button"
                onClick={() => setShowAccountForm(() => true)}
                className="rounded-full bg-emerald-700 px-4 py-2.5 font-serif tracking-wide text-white"
            >
                +
            </button>
            
            <div className="ml-auto">
            <button 
                className={`rounded-full px-5 py-2.5 font-serif tracking-wide ${selectedType === 'credit' ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-300'}`} 
                onClick={() => setSelectedType('credit')}
            > {/*If this button matches current state, give it class name "active" */}
                Credit
            </button>

            <button
                className={`rounded-full px-5 py-2.5 font-serif tracking-wide ${selectedType === 'cash' ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-300'}`}
                onClick={() => setSelectedType('cash')}
            >
                Cash
            </button>
            </div>

            {showAccountForm && (
                <AccountCRUD
                    accountName={accountName}
                    setAccountName={setAccountName}
                    cashBalance={cashBalance}
                    setCashBalance={setCashBalance}
                    onSubmit={handleSubmit}
                    onClose={() => setShowAccountForm(false)}
                />
            )}
        </div>

    )
}

export default AccountBar