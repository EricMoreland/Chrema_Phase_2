function ReportErrorButton({ onClick }) {

    return(
        <button
          type="button"
          onClick={onClick}
          aria-label="Report Error"
          className="grid size-10 place-items-center rounded-full border-[3px] border-[#eee9de] bg-[#eee9de] p-[3px] text-xl font-bold leading-none text-red-600 shadow-[0_2px_5px_rgba(0,0,0,0.45)] hover:scale-105"
        >
          <span className="grid size-full place-items-center rounded-full outline-3 border-red-600 text-2xl font-bold leading-none text-red-600">
          !
          </span>
        </button>
    )
}

export default ReportErrorButton