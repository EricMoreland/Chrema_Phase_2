import { Home, ShoppingCart, Car, Utensils, MoreHorizontal} from "lucide-react";
import ExitButton from './ExitButton';

function TransactionForm({
    newDescription,
    setNewDescription,
    newAmount,
    setNewAmount,
    newDate,
    setNewDate,
    handleAddTransactionProp,
    newCategory,
    setNewCategory,
    categories,
    transactionKind,
    setTransactionKind,
    onClose
}){


    return (
        <div className="min-h-[440px] text-left">
            {/* select whether the transaction is income or expense.*/}
            <div className="relative mx-auto mb-5 h-[72px] w-full">
                <h2 className="mx-auto grid h-[72px] max-w-[290px] place-items-center rounded-[16px] bg-[#1d3040] font-serif text-2xl text-[#eee9de] shadow-[0_8px_20px_rgba(0,0,0,0.18)]">
                    Add Transaction
                </h2>
                <div className="absolute right-0 top-0 flex h-[72px] w-[136px] flex-col gap-2">
                <button
                    className={`flex-1 rounded-[10px] border border-slate-600 px-4 py-2 font-serif ${
                        transactionKind === 'income'
                            ? 'border-[#507a49] bg-[#507a49] text-[#eee9de] hover:bg-[#5d8955]'
                            : 'bg-[#263747] text-[#eee9de]'
                    }`}
                    onClick={() => setTransactionKind('income')}
                >
                    Income
                </button>
                <button
                    className={`flex-1 rounded-[10px] border border-slate-600 px-4 py-2 font-serif ${
                        transactionKind === 'expense'
                            ? 'border-[#693f3f] bg-[#693f3f] text-[#eee9de] hover:bg-[#784848]'
                            : 'bg-[#263747] text-[#eee9de]'
                    }`}
                    onClick={() => setTransactionKind('expense')}
                >
                    Expense
                </button>
                </div>
            </div>

            <div className="mx-auto w-full max-w-[510px]">
            <div className="mb-4">
                <label className="mb-2 block text-center font-serif text-base text-[#eee9de]">
                    Category
                </label>
                {/* Display the available transaction categories as selectable buttons*/}
                <div className="flex w-full flex-wrap justify-center gap-2">
                {categories.map((category) => {
                    return (
                        <button
                            key={category}
                            className={`grid size-13 place-items-center rounded-[12px] border ${
                                newCategory === category
                                    ? 'border-[#eee9de] bg-[#2e6f8e] text-white'
                                    : 'border-white/10 bg-[#263747] text-[#eee9de]'
                            }`}
                            onClick={() => setNewCategory(category)}
                        >
                            {category == 'Home' && <Home size={22} />}
                            {category == 'Groceries' && <ShoppingCart size={22} />}
                            {category == 'Car' && <Car size={22} />}
                            {category == 'Food' && <Utensils size={22} />}
                            {category == 'Other' && <MoreHorizontal size={22} />}
                        </button>
                    )
                })}
                </div>
            </div>

            <div className="mb-4">
                <label htmlFor="new-transaction-name" className="mb-2 block font-serif text-base text-[#eee9de]">
                    Transaction Name
                </label>
                <input
                    id="new-transaction-name"
                    type='text'
                    placeholder='Transaction name'
                    value={newDescription}
                    //event = info about what just happend in the input box (here: the new text typed)
                    onChange={(event) => setNewDescription(event.target.value)} //event.target = the input box, .value = its current text
                    className="w-full rounded-[10px] border border-slate-600 bg-[#263747] px-3 py-2 text-[#eee9de] outline-none focus:border-sky-400"
               /> {/*type a letter, onChange execute -> setNewDescription updates state -> react makes value={newDescription} */}
            </div>
            <div className="mb-4">
                <label htmlFor="new-transaction-amount" className="mb-2 block font-serif text-base text-[#eee9de]">
                    Transaction Amount
                </label>
                <input
                    id="new-transaction-amount"
                    type='number'
                    placeholder='Transaction Amount'
                    value={newAmount}
                    onChange={(event) => setNewAmount(event.target.value)}
                    className="w-full rounded-[10px] border border-slate-600 bg-[#263747] px-3 py-2 text-[#eee9de] outline-none focus:border-sky-400"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="new-transaction-date" className="mb-2 block font-serif text-base text-[#eee9de]">
                    Date
                </label>
                <input
                id="new-transaction-date"
                type = 'date'
                value={newDate}
                onChange={(event) => setNewDate(event.target.value)}
                className = "w-full rounded-[10px] border border-slate-600 bg-[#263747] px-3 py-2 text-[#eee9de] outline-none focus:border-sky-400" />
            </div>

                {/* Save the transaction or close the form*/}
            <div className="mt-8 flex gap-6">
                <button onClick={handleAddTransactionProp}
                className="flex-1 rounded-[10px] bg-[#2e6f8e] px-4 py-3 font-serif text-lg text-[#eee9de] hover:bg-[#3b8cae]"
                >
                Save
                 </button>
                <ExitButton onExit={onClose} />
            </div>
            </div>
        </div>
    )
}

export default TransactionForm