// Hand.js
import { createContext, useContext, useState } from "react";
import AvailableCards from '../Gamefiles/cards.json';
import GameRules from '../Gamefiles/game.json';
const GameContext = createContext<any>({});


export const GameProvider = ({ children }) => {
    const [selectedCard, setSelectedCard] = useState({})

    const [centerBoard, setCenterBoard] = useState([])
    const [leftBoard, setLeftBoard] = useState([])
    const [rightBoard, setRightBoard] = useState([])


    const [hand, setHand] = useState([
        { suit: "♥", value: "A", onClick: () => {}, flipped: false },
    ]);

    const [deck, setDeck] = useState([
        { suit: "♥", value: "W", onClick: () => {}, flipped: false },
        { suit: "♥", value: "O", onClick: () => {}, flipped: false },
        { suit: "♥", value: "R", onClick: () => {}, flipped: false },
        { suit: "♥", value: "K", onClick: () => {}, flipped: false },
        { suit: "♥", value: "I", onClick: () => {}, flipped: false },
        { suit: "♥", value: "N", onClick: () => {}, flipped: false },
        { suit: "♥", value: "G", onClick: () => {}, flipped: false },
    ]);

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

    const placeCard = (board: object, card: object) => {
        console.log(hand)
        if(hand.length <= 0) {
            throw Error('NO CARDS AT HAND')
        }
        let elem = hand.findIndex((v) => { return v === card})
        const deleteByIndex = (arr, index) => arr.filter((_, i) => i !== index);
        setHand(deleteByIndex(hand, elem))
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
        centerBoard: centerBoard,
        leftBoard: leftBoard,
        rightBoard: rightBoard,
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