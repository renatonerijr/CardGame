import { Link } from "react-router-dom"

export const StartMenu = () => {
    return (
        <div className="h-screen flex justify-center items-center">
            <div className="w-full max-w-md flex flex-col justify-center items-center">
                <Link to="/game/">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-96 border border-blue-700 rounded w-full mb-4" >Start Game</button>
                </Link>
                <Link to="/deck-builder/">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-96 border border-blue-700 rounded w-full">Build Deck</button>
                </Link>
                <Link to="/">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-96 mt-4 border border-blue-700 rounded w-full" onClick={() => {localStorage.setItem('game_sessions', '[]');localStorage.setItem('round', '0')}}>Limpar tudo</button>
                </Link>
            </div>
        </div>
    
    )
}