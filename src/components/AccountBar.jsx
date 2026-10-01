import { useState } from "react";

function AccountBar({ selectedType, setSelectedType, accounts }) {
   
    return (
        <div className="account_bar">
            <select>
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