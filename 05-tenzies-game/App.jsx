import { useState, useRef, useEffect } from "react"
import Die from "./Die"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

export default function App() {
    const [dice, setDice] = useState(() => generateAllNewDice())
    const buttonRef = useRef(null)

    const gameWon = dice.every(die => die.isHeld) &&
        dice.every(die => die.value === dice[0].value)

    useEffect(() => {
        if (gameWon) {
            buttonRef.current.focus()
        }
    }, [gameWon])

    function generateAllNewDice() {
        return new Array(10)
            .fill(0)
            .map(() => ({
                value: Math.ceil(Math.random() * 6),
                isHeld: false,
                id: nanoid()
            }))
    }

    function rollDice() {
        if (!gameWon) {
            setDice(oldDice => oldDice.map(die =>
                die.isHeld ?
                    die :
                    { ...die, value: Math.ceil(Math.random() * 6) }
            ))
        } else {
            setDice(generateAllNewDice())
        }
    }

    function hold(id) {
        setDice(oldDice => oldDice.map(die =>
            die.id === id ?
                { ...die, isHeld: !die.isHeld } :
                die
        ))
    }

    const diceElements = dice.map(dieObj => (
        <Die
            key={dieObj.id}
            value={dieObj.value}
            isHeld={dieObj.isHeld}
            hold={() => hold(dieObj.id)}
        />
    ))

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#0B2434] px-4 py-8 sm:px-6 lg:px-10">
            {gameWon && <Confetti />}
            <main className="flex w-full max-w-[420px] flex-col items-center justify-evenly rounded-xl bg-[#F5F5F5] px-6 py-8 sm:px-8 sm:py-10 lg:w-[35%] lg:min-w-[360px] lg:max-w-[480px] lg:px-6 lg:py-8">
                <div aria-live="polite" className="sr-only">
                    {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
                </div>
                <h1 className="m-0 text-4xl font-bold text-[#0B2434] sm:text-4xl lg:text-3xl">
                    Tenzies
                </h1>
                <p className="mt-2 max-w-[320px] text-center text-base font-normal leading-relaxed text-[#0B2434] sm:text-lg lg:mt-1 lg:max-w-[85%] lg:text-sm">
                    Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
                </p>
                <div className="my-8 grid grid-cols-5 gap-3 sm:gap-4 lg:my-6 lg:gap-2.5">
                    {diceElements}
                </div>
                <button
                    ref={buttonRef}
                    className="h-12 whitespace-nowrap rounded-md bg-[#5035FF] px-6 text-lg font-bold text-white transition-colors hover:bg-[#402ad1] sm:h-[50px] sm:px-8 lg:h-11 lg:px-6 lg:text-base"
                    onClick={rollDice}
                >
                    {gameWon ? "New Game" : "Roll"}
                </button>
            </main>
        </div>
    )
}
