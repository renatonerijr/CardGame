// Hand.js
import { createContext, useContext, useState } from "react";

const GameContext = createContext<any>({});


export const GameProvider = ({ children }) => {
    const [hand, setHand] = useState<any[]>([
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

    const gameLogic = {
        hand: {
            hand: hand, 
            setHand: setHand
        },
        deck: {
            deck: deck, 
            setDeck: setDeck
        },
        shuffleCards: shuffleCards,
        drawCard: drawCard
    }


    return (
        <GameContext.Provider value={{ gameLogic }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGameContext = () => useContext(GameContext);
export default GameProvider