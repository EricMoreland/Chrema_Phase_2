import { useState } from 'react';

const errorTypes = [
    'Account Issue',
    'Savings Goal Issue',
    'Budget Issue',
    'Transaction Error',
    'Balance Error',
    'General Error'
]

function ErrorButton({text, setErrorType, selectedError}) {
    return(
    <button 
    onClick={() => setErrorType(text)}
    aria-pressed={selectedError} //turns to toggle button (true/false) to use css to indicate selection
    className={`rounded-lg border px-4 py-3 transition ${
                selectedError
                    ? 'border-sky-300 bg-sky-600 text-white'
                    : 'border-slate-500 bg-slate-700 text-slate-200 hover:bg-slate-600'
            }`}
    type="button"
    >{text}</button>
    )
}

function ReportError({ onClose }) {
    const [errorType, setErrorType] = useState('')
    const [description, setDescription] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
    }
    
    return(
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4">

    <form onSubmit={handleSubmit}>
        <div>
            <h2>Report Error</h2>
        </div>

        <button type="button" onClick={onClose}>x</button>
        <div>
        {errorTypes.map((type) => (
            <ErrorButton key={type} text={type} setErrorType={setErrorType} selectedError={errorType === type} />
        ))}  
        </div>
    
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Please describe your problem...'/>
        <button type='submit'>SUBMIT</button>
        <button type="button" onClick={onClose}>CANCLE</button>
    </form>
    </div>
    )
}

export default ReportError