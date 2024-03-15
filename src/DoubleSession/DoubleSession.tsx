import { Link } from "react-router-dom"

export const DoubleSession = () => {
    return (
        <div className="h-screen flex-col    flex justify-center items-center">
            <p className="text-xl p-10 font-bold">MUITAS SESSÕES ATIVAS!</p>
            <div className="w-full max-w-md flex flex-col justify-center items-center">
                <Link to="/">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-96 border border-blue-700 rounded w-full mb-4" >Menu</button>
                </Link>
                <Link to="/">
                    <button onClick={() => {localStorage.setItem('game_sessions', '[]')}} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-96 border border-blue-700 rounded w-full">Limpar sessões</button>
                </Link>
            </div>
        </div>
    
    )
}