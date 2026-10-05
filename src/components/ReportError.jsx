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
    <form onSubmit={handleSubmit}>
        <div>
            Report Error
        </div>

    <ErrorButton text='Account Issue' setErrorType={setErrorType} selectedError={errorType === 'Account Issue'} />
    <ErrorButton text='Savings Goal Issue' setErrorType={setErrorType} selectedError={errorType === 'Savings Goal Issue'} />
    <ErrorButton text='Budget Issue' setErrorType={setErrorType} selectedError={errorType === 'Budget Issue'} />
    <ErrorButton text='Transaction Error' setErrorType={setErrorType} selectedError={errorType === 'Transaction Error'} />
    <ErrorButton text='Balance Error' setErrorType={setErrorType} selectedError={errorType === 'Balance Error'} />
    <ErrorButton text='General Error' setErrorType={setErrorType} selectedError={errorType === 'General Error'} />

    
        <textarea value={description} onChange={(e) => setDescription(e.target.value)}/>
        <button>SUBMIT</button>
    </form>
    )
}