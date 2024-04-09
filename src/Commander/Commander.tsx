import { useGameContext } from '../Game/Game';


export const Commander = () => {
    const { gameLogic } = useGameContext();
    const {life, addLife, removeLife, setLife } = gameLogic.life

    const addLifeToStorage = () => {
        addLife(10)
        let game_sessions: [] = JSON.parse(localStorage.getItem('game_sessions'))
        const filteredSession = game_sessions.find(v => v['game_session_id'] === gameLogic.game_session_id);
        filteredSession['life'] = filteredSession['life'] + 10
        localStorage.setItem('game_sessions', JSON.stringify(game_sessions));
    }

    const removeLifeToStorage = () => {
        removeLife(10)
        let game_sessions: [] = JSON.parse(localStorage.getItem('game_sessions'))
        const filteredSession = game_sessions.find(v => v['game_session_id'] == gameLogic.game_session_id);
        filteredSession['life'] = filteredSession['life'] - 10
        localStorage.setItem('game_sessions', JSON.stringify(game_sessions));
    }

    return (
        <div className='mb-10'>
            <p className='font-bold text-white bg-black w-full text-center mb-2 text-xl'>VIDA</p>
            <div className="flex justify-center items-center">
                <p className='rounded-full w-24 h-24 flex justify-center items-center bg-black text-white'>
                    {life}
                </p>
            </div>
            <div className="w-full flex-row mt-2 space-x-2 flex">
                <button className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" onClick={() => {addLifeToStorage()}}>+10</button>
                <button className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" onClick={() => {removeLifeToStorage()}}>-10</button>
            </div>

        </div>
    )
}