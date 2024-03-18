import { useEffect, useState } from 'react';
import { useGameContext } from '../Game/Game';


export const TurnController = () => {
    const { gameLogic } = useGameContext();
    const [turn, setTurn] = useState<any>(Number(localStorage.getItem('round')));

    useEffect(() => {

    }, )
    const is_turn_even = turn % 2 === 0;
    let my_turn = false;
    
    if (is_turn_even) {
        my_turn = !gameLogic.is_odd;
    } else {
        my_turn = gameLogic.is_odd;
    }

    useEffect(() => {
        window.addEventListener('storage', storageEventHandler, false);
    }, [turn]);

    function storageEventHandler() {
        setTurn(Number(localStorage.getItem('round')))
    }

    console.log("TURNO É", turn)
    console.log("EU SOU ODD?", gameLogic.is_odd)
    console.log("O TURNO É EVEN?", is_turn_even)
    console.log("É MEU TURNO?", my_turn)

    const disabledBttn = "pointer-events-none w-full text-black font-bold py-2 px-4 border rounded hover:bg-slate-700 border-slate-700 bg-slate-700"
    const enabledBttn = "bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
    return (
        <div>
            <div className="flex flex-col justify-center items-center">
                <p className='font-bold text-white bg-black w-full text-center mb-2 text-xl'>ROUNDS:</p>
                <p className='rounded-full w-24 h-24 flex justify-center items-center bg-black text-white'>
                    {turn}
                </p>
            </div>
            <div className="w-full flex-row mt-2 space-x-2 flex">
                <button className={my_turn ? enabledBttn : disabledBttn} onClick={() => {
                    localStorage.setItem('round', turn+1)
                    setTurn(turn+1)
                }}>
                    {my_turn ? "END TURN" : "WAITING"}
                </button>
            </div>
        </div>
    )
}