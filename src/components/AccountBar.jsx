import { useState } from "react";

function AccountBar({ selectedType, setSelectedType }) {
   
    return (
        <div className="account_bar">
            <select>
                <option>FNB Account</option>
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