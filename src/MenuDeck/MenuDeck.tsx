import { useState } from "react";
import { DeckViewer } from "../DeckViewer/DeckViewer"
import { EventViewer } from "../EventViewer/EventViewer";
import { useGameContext } from "../Game/Game";
import { Link } from "react-router-dom";


export const MenuDeck = () => {

    const { gameLogic } = useGameContext();
    const { hand, setHand } = gameLogic
    const {deckViewer, setDeckViewer, deck, setDeck} = gameLogic.deck
    const {discardViewer, setDiscardViewer, discard, setDiscard} = gameLogic.discard
    const [eventViewerIsVisible, setEventViewerIsVisible] = useState(false)
    return (
        <div>
            <div className="absolute top-0 right-0">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" onClick={() => {setEventViewerIsVisible(true)}}>EventList</button>
                <Link to="/">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">Menu</button>
                </Link>
            </div>
            {
                deckViewer ? 
                (
                    <div className="absolute h-full w-full top-0 right-0">
                        {
                            deck != undefined ? (
                                <>
                                    <button className="bg-blue-500  w-4/12 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" onClick={() => {setDeckViewer(false)}}>Close</button>
                                    <DeckViewer deck={deck} setDeck={setDeck} hand={hand}/>
                                </>
                            ) : (<></>)
                        }
                    </div>
                ) : (<></>)
            }
            {
                discardViewer ? 
                (
                    <div className="absolute h-full w-full top-0 right-0">
                        {
                            deck != undefined ? (
                                <>
                                    <button className="bg-blue-500  w-4/12 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" onClick={() => {setDiscardViewer(false)}}>Close</button>
                                    <DeckViewer deck={discard} setDeck={setDiscard} hand={hand}/>
                                </>
                            ) : (<></>)
                        }
                    </div>
                ) : (<></>)
            }
            {
                eventViewerIsVisible ? 
                (
                    <div className="absolute h-full w-full top-0 right-0">
                        <button className="bg-blue-500  w-4/12 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" onClick={() => {setEventViewerIsVisible(false)}}>Close</button>
                        <EventViewer gameLogic={gameLogic}/>
                    </div>
                ) : (<></>)
            }
        </div>
        
    )
}
