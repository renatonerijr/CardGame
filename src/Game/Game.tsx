// Hand.js
import { createContext, useContext, useEffect, useState } from "react";
import { flushSync } from 'react-dom';
import AvailableCards from '../Gamefiles/cards.json';
import GameRules from '../Gamefiles/game.json';
const GameContext = createContext<any>({});


export const GameProvider = ({ children }) => {
    const [eventList, setEventList] = useState([])
    const [selectedCard, setSelectedCard] = useState({})

    const [centerBoard, setCenterBoard] = useState([...GameRules.boards.center])
    const [leftBoard, setLeftBoard] = useState([...GameRules.boards.left])
    const [rightBoard, setRightBoard] = useState([...GameRules.boards.right])

    const [hand, setHand] = useState([]);

    const [deck, setDeck] = useState([...AvailableCards]);
    const [deckViewer, setDeckViewer] = useState(false)

    const [life, setLife] = useState(20)
    const deleteByIndex = (arr, index) => arr.filter((_, i) => i !== index);

    useEffect(() => {
        let last_event = eventList[eventList.length-1]
        if (!last_event || !gameLogic) {
            return
        }

        if (last_event["type"] == "draw_card") {
            let cardDraw = deck.shift()
            setDeck([...deck])
            setHand([...hand, cardDraw])
        }

        if (last_event["type"] == "shuffle_deck") {
            setDeck(deck.sort((_, __) => 0.5 - Math.random()))
        }

        if (last_event["type"] == "add_life") {
            setLife(life + last_event["ad_life"])
        }

        if (last_event["type"] == "remove_life") {
            setLife(life - last_event["rem_life"])
        }

        if (last_event["type"] == "place_energy") {
            let card_in_board = last_event['card_in_board']
            let board_selected = last_event['board_selected']
            let index_row = last_event['index_row']
            card_in_board['energy_slot'] = [...card_in_board['energy_slot'], selectedCard]
            last_event["center_board"][board_selected].slots[index_row] = card_in_board

            setCenterBoard(last_event["center_board"])
            setSelectedCard({})
            setHand(deleteByIndex(hand, last_event['selected_card']))
        }

        if (last_event["type"] == "place_card") {
            let board_selected = last_event['board_selected']
            let index_row = last_event['index_row']
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
            console.log(last_event['center_board'])
            console.log(last_event['right_board'])
            console.log(last_event['left_board'])

            setSelectedCard({})
            setHand(deleteByIndex(hand, last_event['selected_card']))
        }

    }, [eventList])

    const addToEventList = (eventObject) => {
        try {
            setEventList(
                [...eventList, {...eventObject, 
                    "gameLogic": JSON.stringify({
                        "deck": deck,
                        "hand": hand,
                        "life": life,
                        "selectedCard": selectedCard,
                        "centerBoard": centerBoard,
                        "leftBoard": leftBoard,
                        "rightBoard": rightBoard
                    })
                }]
            );
        } catch (error) {
            console.error(error);
        }
    }

    const drawCard = () => {
        if (deck.length > 0) {
            addToEventList({"type": "draw_card"})
        }
    }

    const shuffleCards = () => {
        addToEventList({"type": "shuffle_deck"})
    }

    const placeCard = (board_row: object, index_row: number) => {

        if(hand.length <= 0) {
            throw Error('NO CARDS AT HAND')
        }

        if (selectedCard.type != board_row.type && selectedCard.type != "ENERGY") {
            throw Error('BOARD NOT ALLOWED')
        }

        if (board_row.slots[index_row] && selectedCard.type != "ENERGY"){
            throw Error('CARD ALREADY ON BOARD')
        }

        if (selectedCard.type == "ENERGY" && board_row.side != "center") {
            throw Error('ENERGY CARD CANNOT BE APPLIED TO SIDE BOARDS')
        }
        let board_selected = centerBoard.findIndex((v) => {return v === board_row})
        let card_in_board = centerBoard[board_selected].slots[index_row]

        if (card_in_board == undefined && selectedCard.type == "ENERGY") {
            throw Error("Can't apply energy on none card")
        }

        let elem = hand.findIndex((v) => { return v === selectedCard})

        if (selectedCard.type == "ENERGY") {
            if (board_row.side == "center") {
                console.log(centerBoard)
                addToEventList({"type": "place_energy", "center_board": centerBoard, "board_selected": board_selected, "card_in_board": card_in_board, "index_row": index_row, "selected_card": elem})
            }
            return true
        }

        if (board_row.side == "center") {
            let board_selected = centerBoard.findIndex((v) => {return v === board_row})
            addToEventList({"type": "place_card", "center_board": centerBoard, "selected_card": elem, "board_selected": board_selected, "index_row": index_row})
        } 
        if (board_row.side == "left") {
            let board_selected = leftBoard.findIndex((v) => {return v === board_row})
            addToEventList({"type": "place_card", "left_board": leftBoard, "selected_card": elem, "board_selected": board_selected, "index_row": index_row})
        }
        if (board_row.side == "right") {
            let board_selected = rightBoard.findIndex((v) => {return v === board_row})
            addToEventList({"type": "place_card", "right_board": rightBoard, "selected_card": elem, "board_selected": board_selected, "index_row": index_row})
        }

    }

    const addLife = (ad_life: number) => {
        addToEventList({"type": "add_life", "ad_life": ad_life})
    }

    const removeLife = (rem_life: number) => {
        addToEventList({"type": "remove_life", "rem_life": rem_life})
    }

    const setToEventList = (index) => {
        let gmlogic = JSON.parse(eventList[index]['gameLogic'])
        setHand(gmlogic['hand'])
        setDeck(gmlogic['deck'])
        setLife(gmlogic['life'])
        setSelectedCard(gmlogic['selectedCard'])
        setCenterBoard(gmlogic['centerBoard'])
        setLeftBoard(gmlogic['leftBoard'])
        setRightBoard(gmlogic['rightBoard'])
    }

    let gameLogic = {
        hand: {
            hand: hand, 
            setHand: setHand
        },
        deck: {
            deck: deck, 
            setDeck: setDeck,
            deckViewer: deckViewer,
            setDeckViewer: setDeckViewer
        },
        selectedCard: {
            selectedCard: selectedCard,
            setSelectedCard: setSelectedCard
        },
        life: {
            life: life,
            addLife: addLife,
            removeLife: removeLife
        },
        boards: {
            centerBoard: centerBoard,
            leftBoard: leftBoard,
            rightBoard: rightBoard,
        },
        shuffleCards: shuffleCards,
        drawCard: drawCard,
        placeCard: placeCard,
        eventList: {
            eventList: eventList,
            setToEventList: setToEventList
        }
    }

    return (
        <GameContext.Provider value={{ gameLogic }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGameContext = () => useContext(GameContext);
export default GameProvider