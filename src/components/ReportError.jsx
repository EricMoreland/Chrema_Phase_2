import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

const errorTypes = [
    'Account Issue',
    'Savings Goal Issue',
    'Budget Issue',
    'Transaction Error',
    'Balance Error',
    'General Error'
]

function ErrorButton({ text, setErrorType, selectedError }) {
    return (
        <button
            onClick={() => setErrorType(text)}
            aria-pressed={selectedError} //turns to toggle button (true/false) to use css to indicate selection
            className={`rounded-lg border px-4 py-3 m-2 transition ${selectedError
                    ? 'border-sky-300 bg-[#2e6f8e] text-[#e8e1d3]'
                    : 'border-slate-500 bg-[#263747] text-[#e8e1d3] hover:bg-slate-600'
                }`}
            type="button"
        >{text}</button>
    )
}

function ReportError({ onClose }) {
    const form = useRef()
    // Track the selected category and user-provided explanation.
    const [errorType, setErrorType] = useState('')
    const [description, setDescription] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Send the selected category and description through EmailJS.
        try {
            await emailjs.sendForm(
                'service_4kb9dmr',
                'template_ul5ef48',
                form.current,
                { publicKey: '3wlINfEu4-zVPWUyI' }
            );

            console.log('SUCCESS!');
            onClose();
        } catch (error) {
            console.log('FAILED...', error.text);
        }
    };

    return (
        <div 
            className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4"
            onMouseDown={(event) => {
                // Close the modal only when the backdrop itself is clicked.
                if (event.target === event.currentTarget) {
                    onClose()
                }
            }}
        >

            <form
                ref={form}
                onSubmit={handleSubmit}
                className="w-full max-w-2xl rounded-3xl border border-slate-500 bg-[#172733] p-6 text-left shadow-2xl"
            >
                <div className="relative flex items-center justify-between mb-10">
                    <h2 
                        className="mx-auto rounded-2xl bg-[#1d3040] px-12 py-5 text-center font-serif text-2xl text-[#e8e1d3] shadow-[0_8px_20px_rgba(0,0,0,0.18)] sm:text-3xl"
                    >
                        Report Error
                        </h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-4xl text-slate-300 hover:scale-105"
                    >x</button>
                </div>

                {/* Let the user choose the type of problem. */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {errorTypes.map((type) => (
                        <ErrorButton key={type} text={type} setErrorType={setErrorType} selectedError={errorType === type} />
                    ))}
                </div>

                {/* Include the selected category in the submitted form. */}
                <input
                    type="hidden"
                    name="error_type"
                    value={errorType}
                /> 

                <textarea
                    className="mt-6 w-full rounded-lg border border-slate-500 bg-[#263747] p-3 text-white placeholder:text-slate-400 outline-none focus:border-sky-400"
                    rows={6}
                    required
                    value={description}
                    name='description'
                    // Keep the textarea controlled by the component state.
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder='Please describe your problem...' />
                <div className="mt-6 flex justify-center">
                    <button
                        type='submit'
                        className="rounded-lg bg-[#2e6f8e] px-16 py-4 text-[#e8e1d3] hover:bg-[#3b8cae]"
                    >SUBMIT</button>
                </div>
            </form>
        </div>
    )
}

export default ReportError