// Hand.js
import { createContext, useContext, useState } from "react";
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

    console.log(eventList)

    const drawCard = () => {
        addToEventList({"type": "draw_card"})
        if (deck.length > 0) {
            let cardDraw = deck.shift()
            setDeck([...deck])
            setHand([...hand, cardDraw])
        }
    }

    const shuffleCards = () => {
        addToEventList({"type": "shuffle_deck"})
        setDeck(deck.sort((_, __) => 0.5 - Math.random()))
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
        const deleteByIndex = (arr, index) => arr.filter((_, i) => i !== index);
        setHand(deleteByIndex(hand, elem))

        if (selectedCard.type == "ENERGY") {
            if (board_row.side == "center") {
                card_in_board['energy_slot'] = [...card_in_board['energy_slot'], selectedCard]
                centerBoard[board_selected].slots[index_row] = card_in_board
                setCenterBoard(centerBoard)
                setSelectedCard({})
                addToEventList({"type": "place_card"})
            }
            return true
        }

        if (board_row.side == "center") {
            let board_selected = centerBoard.findIndex((v) => {return v === board_row})
            centerBoard[board_selected].slots[index_row] = selectedCard
            setCenterBoard(centerBoard)
        } 
        if (board_row.side == "left") {
            let board_selected = leftBoard.findIndex((v) => {return v === board_row})
            leftBoard[board_selected].slots[index_row] = selectedCard
            setLeftBoard(leftBoard)
        }
        if (board_row.side == "right") {
            let board_selected = rightBoard.findIndex((v) => {return v === board_row})
            rightBoard[board_selected].slots[index_row] = selectedCard
            setRightBoard(rightBoard)
        }
        setSelectedCard({})
        addToEventList({"type": "place_card"})
    }

    const addLife = (ad_life: number) => {
        addToEventList({"type": "add_life"})
        setLife(life + ad_life)
    }

    const removeLife = (rem_life: number) => {
        addToEventList({"type": "remove_life"})
        setLife(life - rem_life)
    }

    const setToEventList = (index) => {
        let gmlogic = JSON.parse(eventList[index]['gameLogic'])
        setDeck(gmlogic['deck']['deck'])
        setHand(gmlogic['hand']['hand'])
        setLife(gmlogic['life']['life'])
        setSelectedCard(gmlogic['selectedCard']['selectedCard'])
        console.log(gmlogic['boards']['centerBoard'])
        setCenterBoard([...gmlogic['boards']['centerBoard']])
        setLeftBoard([...gmlogic['boards']['leftBoard']])
        setRightBoard([...gmlogic['boards']['rightBoard']])
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
        setToEventList: setToEventList
    }

    const addToEventList = (eventObject) => {
        let deepCopy = JSON.stringify(gameLogic)
        setEventList(
            [
                ...eventList, 
                {...eventObject, "gameLogic": deepCopy}
            ]
        )
    }



    return (
        <GameContext.Provider value={{ gameLogic }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGameContext = () => useContext(GameContext);
export default GameProvider