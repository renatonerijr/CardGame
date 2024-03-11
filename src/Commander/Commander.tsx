import { useGameContext } from '../Game/Game';


export const Commander = () => {
    const { gameLogic } = useGameContext();
    const {life, addLife, removeLife } = gameLogic.life
    return (
        <div>
            <div className="flex justify-center items-center">
                <p className='rounded-full w-24 h-24 flex justify-center items-center bg-black text-white'>
                    {life}
                </p>
            </div>
            <div className="w-full flex-row mt-2 space-x-2 flex">
                <button className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" onClick={() => {addLife(10)}}>+10</button>
                <button className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" onClick={() => {removeLife(10)}}>-10</button>
            </div>

        </div>
    )
}