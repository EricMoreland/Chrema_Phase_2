function ReportErrorButton({ onClick }) {

    return(
        <button
          type="button"
          onClick={onClick}
          aria-label="Report Error"
          className="grid size-10 place-items-center rounded-full border-4 border-[#eee9de] bg-[#0d1720] text-2xl text-red-600"
        >
          !
        </button>
    )
}

export default ReportErrorButton