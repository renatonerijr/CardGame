import { CardBoard } from "../Board/Board"

export const DeckViewer = (props) => {
    let deck = props.deck
    let setDeck = props.setDeck
    let {hand, setHand} = props.hand

    const returnCardToHand = (index) => {
        let card = deck[index]
        delete deck[index]
        setDeck(deck)
        setHand([...hand, card])
    }

    return (
            <div className="h-full w-4/12">
                <div className="flex content-start flex-wrap h-full flex-row p-5 bg-white w-full">
                    {
                        deck.map((value, index) => {
                            return (
                                <div>
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-44 border border-blue-700 rounded" onClick={() => {returnCardToHand(index)}}>Pegar carta</button>
                                    <CardBoard key={index} row={value}></CardBoard>
                                </div>
                            )
                        })
                    }            
                </div>
            </div>

    )
}