import { useState } from "react";
import { useGameContext } from '../Game/Game';


const Card = (props) => {
    const item = props.item;

    return (
        <div
            className="p-6 w-44 mx-0 h-64 bg-slate-400 rounded-xl shadow-lg flex items-center"
            style={{ transform: `rotate(${props.rotation}deg)` }} // Apply rotation here
        >
            <p className="text-center text-2xl font-bold">
                {item.suit === "♥" || props.suit === "♦" ? (
                    <span className="text-red-500">{item.suit}</span>
                ) : (
                    <span className="text-black">{item.suit}</span>
                )}
                {item.value}
            </p>
        </div>
    );
};

const Hand = () => {
    const { gameLogic } = useGameContext();
    const { hand } = gameLogic.hand;
    const {selectedCard, setSelectedCard } = gameLogic.selectedCard
    return (
        <div className="h-1/3 w-100">
            <div className="flex space-x-2 justify-center items-end">
                    {hand.map((item, index) => (
                        <div onClick={() => {setSelectedCard(item)}} className={selectedCard == item ? "bg-black" : ""}>
                            <Card key={index} item={item}/>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Hand;
