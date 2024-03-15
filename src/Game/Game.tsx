import { createContext, useContext, useEffect, useState } from "react";
import GameRules from '../Gamefiles/game.json';
import { RunGameSession } from "./GameSession";
import { BoardRow } from '../Board/Board'
import { EventHandling } from "./EventHandling";
const GameContext = createContext<any>({});

interface Event {
    type: string
    center_board?: object
    left_board?: object
    right_board?: object
    board_selected?: object
    card_in_board?: object
    index_row?: number
    selected_card?: object
    ad_life?: number
    rem_life?: number
}


interface EventObject {
    type: string
    gameLogic: Object,
    center_board?: any
    left_board?: any
    right_board?: any
    card?: any
    board_selected?: any
    card_in_board?: any
    index_row?: number
    selected_card?: any
    ad_life?: number
    rem_life?: number
}

export const GameProvider = ({ children }) => {
    
    const [eventList, setEventList] = useState<EventObject[]>([])
    const [selectedCard, setSelectedCard] = useState({})
    const game_session_id = RunGameSession()

    const [centerBoard, setCenterBoard] = useState([...GameRules.boards.center])
    const [leftBoard, setLeftBoard] = useState([...GameRules.boards.left])
    const [rightBoard, setRightBoard] = useState([...GameRules.boards.right])

    const activeDeckParsed = JSON.parse(sessionStorage.getItem("active_deck"))
    const [deck, setDeck] = useState<any[]>(activeDeckParsed);

    const [hand, setHand] = useState<any[]>([]);
    const [discard, setDiscard] = useState<any[]>([])

    const [showDiscard, setShowDiscard] = useState(false)

    const [discardViewer, setDiscardViewer] = useState(false)
    const [deckViewer, setDeckViewer] = useState(false)

    const [life, setLife] = useState(20)

    const addToEventList = (eventObject: Event) => {
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

    const placeCard = (board_row: BoardRow, index_row: number) => {
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

        let elem = hand.findIndex((v) => { return v === selectedCard})

        if (selectedCard.type == "ENERGY") {
            let board_selected = centerBoard.findIndex((v) => {return v === board_row})
            let card_in_board = centerBoard[board_selected].slots[index_row]
    
            if (card_in_board == undefined && selectedCard.type == "ENERGY") {
                throw Error("Can't apply energy on none card")
            }
    
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

    const discardCard = (board_row: BoardRow, index_row: number) => {
        if (board_row.side == "center") {
            let board_selected = centerBoard.findIndex((v) => {return v === board_row})
            addToEventList({"type": "discard_card", "center_board": centerBoard, "card": centerBoard[board_selected]["slots"][index_row], "board_selected": board_selected, "index_row": index_row})
        } 
        if (board_row.side == "left") {
            let board_selected = leftBoard.findIndex((v) => {return v === board_row})
            addToEventList({"type": "discard_card", "left_board": leftBoard, "board_selected": board_selected, "card": leftBoard[board_selected]["slots"][index_row], "index_row": index_row})
        }
        if (board_row.side == "right") {
            let board_selected = rightBoard.findIndex((v) => {return v === board_row})
            addToEventList({"type": "discard_card", "right_board": rightBoard,  "card": rightBoard[board_selected]["slots"][index_row], "board_selected": board_selected, "index_row": index_row})
        }
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
        discard: {
            discard: discard,
            setDiscard: setDiscard,
            discardViewer: discardViewer,
            setDiscardViewer: setDiscardViewer,
            showDiscard: showDiscard,
            setShowDiscard: setShowDiscard
        },
        selectedCard: {
            selectedCard: selectedCard,
            setSelectedCard: setSelectedCard
        },
        life: {
            life: life,
            setLife: setLife,
            addLife: addLife,
            removeLife: removeLife
        },
        boards: {
            centerBoard: centerBoard,
            leftBoard: leftBoard,
            rightBoard: rightBoard,
            setCenterBoard: setCenterBoard,
            setLeftBoard: setLeftBoard,
            setRightBoard: setRightBoard
        },
        shuffleCards: shuffleCards,
        drawCard: drawCard,
        placeCard: placeCard,
        discardCard: discardCard,
        eventList: {
            eventList: eventList,
            setToEventList: setToEventList
        }
    }

    EventHandling(gameLogic)

    return (
        <GameContext.Provider value={{ gameLogic }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGameContext = () => useContext(GameContext);
export default GameProvider