import { useEffect, useState } from 'react';
import { useGameContext } from '../Game/Game';


export const TurnController = () => {
    const { gameLogic } = useGameContext();
    const { life, setLife } = gameLogic.life
    const [damage, setDamage] = useState(0); // State to store the value of the input field
    const [turn, setTurn] = useState<any>(Number(localStorage.getItem('round')));

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

    const storageEventHandler = () => {
        setTurn(Number(localStorage.getItem('round')))
        let game_sessions: [] = JSON.parse(localStorage.getItem('game_sessions'))
        const filteredSession = game_sessions.find(v => v['game_session_id'] == gameLogic.game_session_id);
        console.log(filteredSession)
        setLife(Number(filteredSession['life']))
    }

    const giveDamage = () => {
        let game_sessions: [] = JSON.parse(localStorage.getItem('game_sessions'))
        const filteredSession = game_sessions.find(v => v['game_session_id'] != gameLogic.game_session_id);
        filteredSession['life'] = filteredSession['life'] - damage
        localStorage.setItem('game_sessions', JSON.stringify(game_sessions));
    }

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
            <div>
                <div className="mb-4 mt-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" for="round">
                        <p className='font-bold text-white bg-black w-full text-center mb-2 text-xl'>DANO DO ROUND:</p>
                    </label>
                    <input
                        className="mb-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="round"
                        type="number"
                        placeholder="Dano do round"
                        value={damage} // Bind input value to state
                        onChange={(e) => setDamage(e.target.value)} // Update state on input change
                    />
                    <button className={my_turn ? enabledBttn : disabledBttn} onClick={() => {giveDamage()}} >
                        DAR DANO
                    </button>
                </div>
            </div>
        </div>
    )
}