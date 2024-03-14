import { useState } from 'react';
import AvailableCards from '../Gamefiles/cards.json';
import { CardBoard } from '../Board/Board';
import { Link } from 'react-router-dom';
import Deck from '../Deck/Deck';


export const DeckBuilder = () => {

    const [availableCards, _ ] = useState([...AvailableCards])

    const activeDeckParsed = JSON.parse(sessionStorage.getItem("active_deck"))
    const [activeDeck, setActiveDeck] = useState(activeDeckParsed)
    const deleteByIndex = (arr, index) => arr.filter((_, i) => i !== index);

    return (
        <div className='overflow-hidden w-screen h-screen'>
            <div className='h-12 bg-slate-900'>
                <Link to="/">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-96 border border-blue-700 rounded w-full mb-4" >Menu</button>
                </Link>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-96 border border-blue-700 rounded w-full mb-4" onClick={() => {sessionStorage.setItem("active_deck", JSON.stringify(activeDeck))}}>Salvar Deck</button>
            </div>
            <div className='w-screen h-full flex flex-row'>
                <div className='w-6/12 h-6/12 bg-slate-800'>
                    <h1 className='text-xl font-bold text-white'>Available Cards</h1>
                    <div className='flex content-start bg-slate-500 h-full overflow-y-auto flex-wrap flex-row p-5 bg-white'>
                        {
                            availableCards.map((value, index) => {
                                return (
                                    <div key={value.id + index} onClick={() => {setActiveDeck([...activeDeck, value])}}>
                                        <CardBoard key={index} row={value}></CardBoard>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className='w-6/12 h-6/12 bg-slate-800'>
                    <h1 className='text-xl font-bold text-white'>Active Deck</h1>
                    <div className='flex content-start bg-slate-500 h-full overflow-y-auto flex-wrap flex-row p-5 bg-white'>
                        {
                            activeDeck.map((value, index) => {
                                return (
                                    <div key={value.id + index} onClick={() => {setActiveDeck(deleteByIndex(activeDeck, index))}}>
                                        <CardBoard key={index} row={value}></CardBoard>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
       
    )
}