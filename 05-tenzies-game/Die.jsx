export default function Die(props) {
    return (
        <button
            className={`flex h-12 w-12 items-center justify-center rounded-[10px] text-[1.5rem] font-bold shadow-[0px_2px_2px_rgba(0,0,0,0.15)] transition-colors sm:h-[50px] sm:w-[50px] sm:text-[1.75rem] lg:h-10 lg:w-10 lg:rounded-lg lg:text-lg ${
                props.isHeld ? "bg-[#59E391]" : "bg-white"
            }`}
            onClick={props.hold}
            aria-pressed={props.isHeld}
            aria-label={`Die with value ${props.value}, ${props.isHeld ? "held" : "not held"}`}
        >
            {props.value}
        </button>
    )
}
