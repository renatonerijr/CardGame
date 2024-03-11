import { CardBoard } from "../Board/Board"

export const DeckViewer = (deck) => {
    deck = deck.deck
    return (
            <div className="flex content-start flex-wrap h-full flex-row p-5 bg-white w-4/12 h-full">
                {
                    deck.map((value, index) => {
                        return (<CardBoard key={index} row={value}></CardBoard>)
                    })
                }            
            </div>
    )
}