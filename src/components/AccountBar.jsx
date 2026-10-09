import { useState } from "react";
import AccountAdd from "./AccountAdd";
import AccountDelete from './AccountDelete';



function AccountBar({ selectedType, setSelectedType, accounts, onDeleteAccount, selectedAccountId, setSelectedAccountId, onAddAccount }) {
    const [showAccountForm, setShowAccountForm] = useState(false)
    const [accountName, setAccountName] = useState('')
    const [cashBalance, setCashBalance] = useState('')
    const [showDeleteForm, setShowDeleteForm] = useState(false)

    async function handleSubmit(event) {
        event.preventDefault()

        const accountWasAdded = await onAddAccount({
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

     async function handleDeleteSelectedAccount() {
        const selectedAccount = accounts.find(
            (account) => account.id === selectedAccountId
        )

        if (!selectedAccount) {
            return
        }

        const accountWasDeleted = await onDeleteAccount(selectedAccount.id)

        if (!accountWasDeleted) { //return if account was not deleted, therefore form doesnt close
            alert('Failed to delete account. Please try again.')
            return
        }

        setShowDeleteForm(false)
    }

    return (
        <div className="flex flex-wrap items-center gap-4 mb-8 ">
            <div className="relative">
                <select
                    value={selectedAccountId ?? ''} //while fetch runs and before accounts are loaded, selectedAccountId is null. ?? evaluate between null and '' and returns the first non-null value. 
                    onChange={(e) => setSelectedAccountId(Number(e.target.value))} //value from selectedAccountId is a string
                    className="h-[66px] w-[262px] appearance-none rounded-[14px] border border-white/5 bg-[#1d3040] px-9 pr-16 font-serif text-[17px] uppercase tracking-wide text-[#eee9de] shadow-[0_8px_20px_rgba(0,0,0,0.12)] outline-none transition hover:bg-[#243a4b] focus:border-sky-400"
                >
                    {accounts.map((account) => (
                        <option key={account.id} value={account.id}>{account.name}</option>
                    ))}
                </select>

                <span
                    aria-hidden="true"
                    className="pointer-events-none absolute right-6 top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 border-b-4 border-r-4 border-[#eee9de]"
                />
            </div>
            
            <button
                type="button"
                onClick={() => setShowAccountForm(() => true)}
                className="rounded-full text-2xl place-items-center hover:bg-emerald-600 bg-emerald-700 px-4.5 py-2.5 font-serif tracking-wide text-white"
            >
                +
            </button>

            <button
                type="button"
                onClick={() => setShowDeleteForm(() => true)}
                className="rounded-full text-2xl place-items-center hover:bg-red-600 bg-red-700 px-5.5 py-2.5 font-serif tracking-wide text-white"
            >
                -
            </button>
            
            
            <div className="ml-auto flex items-center gap-5">
                <button
                    className={`h-[66px] min-w-[99px] rounded-[14px] border border-white/5 px-5 font-serif text-[15px] uppercase tracking-wide transition ${selectedType === 'credit'
                            ? 'bg-[#2e6f8e] text-[#eee9de] shadow-[0_8px_20px_rgba(0,0,0,0.12)]'
                            : 'bg-[#1d3040] text-[#eee9de] hover:bg-[#263d4d]'
                        }`}
                    onClick={() => setSelectedType('credit')}
                > { }
                Credit
            </button>

                <button
                    className={`h-[66px] min-w-[99px] rounded-[14px] border border-white/5 px-5 font-serif text-[15px] uppercase tracking-wide transition ${selectedType === 'cash'
                            ? 'bg-[#2e6f8e] text-[#eee9de] shadow-[0_8px_20px_rgba(0,0,0,0.12)]'
                            : 'bg-[#1d3040] text-[#eee9de] hover:bg-[#263d4d]'
                        }`}
                    onClick={() => setSelectedType('cash')}
                >
                    Cash
            </button>
            </div>

            {showAccountForm && (
                <AccountAdd
                    accountName={accountName}
                    setAccountName={setAccountName}
                    cashBalance={cashBalance}
                    setCashBalance={setCashBalance}
                    onSubmit={handleSubmit}
                    onClose={() => setShowAccountForm(false)}
                />
            )}

            {showDeleteForm && (
                <AccountDelete
                    accountName={
                        accounts.find((account) => account.id === selectedAccountId)?.name ?? ''
                    }
                    onConfirm={handleDeleteSelectedAccount}
                    onClose={() => setShowDeleteForm(false)}
                />
            )}
        </div>

    )
}

export default AccountBar