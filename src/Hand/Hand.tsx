import { useState } from "react";
import { useGameContext } from '../Game/Game';
import { CardBoard } from '../Board/Board'


const Hand = () => {
    const { gameLogic } = useGameContext();
    const { hand } = gameLogic.hand;
    const {selectedCard, setSelectedCard } = gameLogic.selectedCard
    return (
        <div className="h-1/3 w-100">
            <div className="flex space-x-2 justify-center items-end">
                    {hand.map((item, index) => (
                        <div key={item.id + index} onClick={() => {setSelectedCard(item)}} className={selectedCard == item ? "bg-black p-1 rounded-xl" : ""}>
                            <CardBoard row={item}/>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Hand;
