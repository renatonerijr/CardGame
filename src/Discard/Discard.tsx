import { useGameContext } from '../Game/Game';


const Discard = () => {
    const { gameLogic } = useGameContext();
    const { setDiscardViewer, setShowDiscard, showDiscard } = gameLogic.discard

    return (
        <div
            className="p-6 w-44 mx-0 h-64 mx-auto bg-slate-400 rounded-xl shadow-lg flex-row items-center"
        >
            <p className="text-center text-2xl font-bold">
                <span className="text-red-500">DISCARD ZONE</span>
            </p>
            <div className='flex-row'>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full border border-blue-700 rounded" onClick={() => {setDiscardViewer(true)}}>See discard</button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full border border-blue-700 rounded" onClick={() => {setShowDiscard(!showDiscard)}}>Discards</button>

            </div>
        </div>
    );
}

export default Discard;