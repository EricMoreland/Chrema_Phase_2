import { useState } from "react";

function AccountBar() {
    const [selectedType, setSelectedType] = useState('cash')

    return (
        <div className="account_bar">
            <select>
                <option>FNB Account</option>
            </select>

            <button>
                Credit
            </button>

            <button>
                Cash
            </button>
        </div>

    )
}

export default AccountBar