// Hand.js
import { createContext, useContext, useState } from "react";
import AvailableCards from '../Gamefiles/cards.json';
import GameRules from '../Gamefiles/game.json';
const GameContext = createContext<any>({});


export const GameProvider = ({ children }) => {
    const [selectedCard, setSelectedCard] = useState({})

    const [centerBoard, setCenterBoard] = useState([...GameRules.boards.center])
    const [leftBoard, setLeftBoard] = useState([...GameRules.boards.left])
    const [rightBoard, setRightBoard] = useState([...GameRules.boards.right])

    console.log(centerBoard)
    
    const [hand, setHand] = useState([]);

    const [deck, setDeck] = useState([...AvailableCards]);

    const drawCard = () => {
        if (deck.length > 0) {
            let cardDraw = deck.shift()
            setDeck([...deck])
            setHand([...hand, cardDraw])
        }
    }

    const shuffleCards = () => {
        setDeck(deck.sort((_, __) => 0.5 - Math.random()))
    }

    const placeCard = (board_row: object, index_row: number) => {
        if(hand.length <= 0) {
            throw Error('NO CARDS AT HAND')
        }

        if (selectedCard.type != board_row.type) {
            throw Error('BOARD NOT ALLOWED')
        }

        let elem = hand.findIndex((v) => { return v === selectedCard})
        const deleteByIndex = (arr, index) => arr.filter((_, i) => i !== index);
        setHand(deleteByIndex(hand, elem))



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
    }

    const gameLogic = {
        hand: {
            hand: hand, 
            setHand: setHand
        },
        deck: {
            deck: deck, 
            setDeck: setDeck
        },
        selectedCard: {
            selectedCard: selectedCard,
            setSelectedCard: setSelectedCard
        },
        boards: {
            centerBoard: centerBoard,
            leftBoard: leftBoard,
            rightBoard: rightBoard,
        },
        shuffleCards: shuffleCards,
        drawCard: drawCard,
        placeCard: placeCard
    }


    return (
        <GameContext.Provider value={{ gameLogic }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGameContext = () => useContext(GameContext);
export default GameProvider