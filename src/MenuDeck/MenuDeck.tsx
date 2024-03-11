import { DeckViewer } from "../DeckViewer/DeckViewer"
import { useGameContext } from "../Game/Game";


export const MenuDeck = () => {

    const { gameLogic } = useGameContext();
    const {deckViewer, setDeckViewer} = gameLogic.deck
    const { deck } = gameLogic.deck
    console.log(deck)
    return (
        deckViewer ? 
            (
                <div className="absolute h-full w-full top-0 right-0">
                    {
                        deck != undefined ? (
                            <>
                                <button className="bg-blue-500  w-4/12 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" onClick={() => {setDeckViewer(false)}}>Close</button>
                                <DeckViewer deck={deck}/>
                            </>
                        ) : (<></>)
                    }
                </div>
            ) : (<></>)
        
    )
}
