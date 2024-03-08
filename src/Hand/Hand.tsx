import { useState } from "react";
import { useGameContext } from '../Game/Game';


const Card = (props) => {
    const item = props.item;

    return (
        <div
            className="p-6 w-44 mx-0 h-64 bg-slate-400 rounded-xl shadow-lg flex items-center"
            style={{ transform: `rotate(${props.rotation}deg)` }} // Apply rotation here
            onClick={item.onClick}
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
    console.log(hand)
    return (
        <div className="container mx-auto absolute bottom-0 right-0 left-0">
            <div className="flex justify-center items-end relative">
                <div className="absolute bottom-0 m-0 left-0 right-0 flex justify-center">
                    {hand.map((item, index) => (
                        <Card key={index} item={item}/>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Hand;
