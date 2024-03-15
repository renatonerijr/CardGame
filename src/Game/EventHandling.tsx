import { useEffect } from "react"

export const EventHandling = (gameLogic: any) => {

    const {eventList} = gameLogic.eventList
    const {hand, setHand} = gameLogic.hand
    const {deck, setDeck} = gameLogic.deck
    const {life, setLife} = gameLogic.life
    const {discard, setDiscard} = gameLogic.discard
    const {setCenterBoard, setRightBoard, setLeftBoard} = gameLogic.boards
    const {selectedCard, setSelectedCard} = gameLogic.selectedCard
    const deleteByIndex = (arr: any, index: number) => arr.filter((_: any, i: number) => i !== index);

    useEffect(() => {
        let last_event = eventList[eventList.length-1]
        if (!last_event || !gameLogic) {
            return
        }

        if (last_event.type == "draw_card") {
            let cardDraw = deck.shift()
            setDeck([...deck])
            setHand([...hand, cardDraw])
        }

        if (last_event.type == "shuffle_deck") {
            setDeck(deck.sort((_, __) => 0.5 - Math.random()))
        }

        if (last_event.type == "add_life" && last_event.ad_life) {
            setLife(life + last_event.ad_life)
        }

        if (last_event["type"] == "remove_life" && last_event.rem_life) {
            setLife(life - last_event.rem_life)
        }

        if (last_event.type == "place_energy" && last_event.card_in_board && last_event.center_board) {
            let card_in_board = last_event['card_in_board']
            let board_selected = last_event['board_selected']
            let index_row = last_event['index_row']
            card_in_board['energy_slot'] = [...card_in_board['energy_slot'], selectedCard]
            last_event["center_board"][board_selected].slots[index_row] = card_in_board

            setCenterBoard(last_event["center_board"])
            setSelectedCard({})
            setHand(deleteByIndex(hand, last_event['selected_card']))
        }

        if (last_event.type == "place_card") {

            let board_selected = last_event.board_selected
            let index_row = last_event.index_row
            if (last_event['center_board']){
                last_event['center_board'][board_selected]["slots"][index_row] = selectedCard
                setCenterBoard(last_event['center_board'])
            } 
            if (last_event['right_board']) {
                last_event['right_board'][board_selected]["slots"][index_row] = selectedCard
                setRightBoard(last_event['right_board'])
            }
            if (last_event['left_board']) {
                last_event['left_board'][board_selected]["slots"][index_row] = selectedCard
                setLeftBoard(last_event['left_board'])
            }

            setSelectedCard({})
            setHand(deleteByIndex(hand, last_event['selected_card']))
        }

        if(last_event.type == "discard_card") {
            let board_selected = last_event.board_selected
            let index_row = last_event.index_row
            if (last_event.center_board){
                last_event['center_board'][board_selected]["slots"][index_row] = null
                setCenterBoard(last_event['center_board'])
            } 
            if (last_event.right_board) {
                last_event['right_board'][board_selected]["slots"][index_row] = null
                setRightBoard(last_event['right_board'])
            }
            if (last_event.left_board) {
                last_event['left_board'][board_selected]["slots"][index_row] = null
                setLeftBoard(last_event['left_board'])
            }
            setSelectedCard({})
            setDiscard([...discard, last_event['card']])
        }

    }, [eventList])
}