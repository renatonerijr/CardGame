import { useState } from 'react';
import { useGameContext } from '../Game/Game';


export const TurnController = () => {
    const { gameLogic } = useGameContext();
    const [turn, setTurn] = useState<any>(0);
    const [isOdd, setIsOdd] = useState<any>(turn);

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
                <button className={isOdd ? enabledBttn : disabledBttn} onClick={() => {setTurn(turn+1)}}>
                    {isOdd ? "END TURN" : "WAITING"}
                </button>
            </div>
        </div>
    )
}