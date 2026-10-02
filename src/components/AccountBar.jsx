import { useState } from "react";

function AccountBar({ selectedType, setSelectedType, accounts, selectedAccountId, setSelectedAccountId }) {
   
    return (
        <div className="account_bar">
            <select
                value={selectedAccountId ?? ''} //while fetch runs and before accounts are loaded, selectedAccountId is null. ?? evaluate between null and '' and returns the first non-null value. 
                onChange={(e) => setSelectedAccountId(Number(e.target.value))} //value from selectedAccountId is a string
            >
                {accounts.map((account) => (
                <option key={account.id} value={account.id}>{account.name}</option>
                ))}
            </select>

            <button 
                className={selectedType === 'credit' ? 'active' : ''} 
                onClick={() => setSelectedType('credit')}
            > {/*If this button matches current state, give it class name "active" */}
                Credit
            </button>

            <button
                className={selectedType === 'cash' ? 'active' : ''}
                onClick={() => setSelectedType('cash')}
            >
                Cash
            </button>
        </div>

    )
}

export default AccountBar