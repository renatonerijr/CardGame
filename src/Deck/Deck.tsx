import { useGameContext } from '../Game/Game';


function Deck() {
    const { gameLogic } = useGameContext();

    return (
        <div
            className="p-6 w-64 mx-0 h-96 mx-auto bg-slate-400 absolute right-0 mt-10 mr-10 rounded-xl shadow-lg flex-row items-center"
        >
            <p className="text-center text-2xl font-bold">
                <span className="text-red-500">DECK</span>
            </p>
            <div className='flex'>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" onClick={() => {gameLogic.shuffleCards()}}>Shuflle</button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" onClick={() => {gameLogic.drawCard()}}>Draw Card</button>
            </div>
        </div>
    );
}

export default Deck;