import GameRules from '../Gamefiles/game.json'
import { useGameContext } from '../Game/Game';
import { useState } from 'react';
import Card from '../Hand/Hand';

interface BoardRow {
    id: string
    name: string
    size: number
    type: string
    style: string
    slots: []
}

export const CardBoard = (props) => {
    const item = props.row;
    return (
        <div
            className="p-6 w-52 mx-0 h-72 bg-slate-400 rounded-xl shadow-lg flex flex-col"
        >   
            <div className='flex space-x-5 flex-row'>
                <p className="text-left text-xs font-bold">
                    ID:{item['id']}
                </p>
                <p className="text-right text-xs font-bold">
                    TYPE:{item['type']}
                </p>
            </div>
            <p className="text-center mt-2 text-2xl font-bold">
                {item['name']}
            </p>
            <p className="text-center mt-5 text-xs font-bold">
                {item['description']}
            </p>
            <div className="flex flex-row space-x-1 mt-5 text-xs font-bold">
                <p>ENERGY SLOTS: </p>
                {
                item['energy_slot'] != undefined ? 
                    item['energy_slot'].map((value) => (
                        <p>{value['description']}</p>
                    ))
                    :
                    <></>
                }
            </div>
        </div>
    );
};

const BoardField = (row: BoardRow) => {
    row = row.row
    const { gameLogic } = useGameContext();

    return (
        <div>
            <div className="flex flex-row justify-center space-x-5">{row.type}</div>
            <div className="flex flex-row justify-center space-x-5 m-2">
                {
                    Array.from({ length: row.size }, (_, index) => (
                            <div onClick={() => {gameLogic.placeCard(row, index)}} className="rounded-xl border-2 w-52 h-72 border-black">
                                {
                                    row.slots[index] != undefined ? 
                                    (   
                                        <CardBoard key={row.slots[index]["id"] + index} row={row.slots[index]}></CardBoard>
                                    ) : (<></>)
                                }
                            </div>
                    ))
                }
            </div>
        </div>
    )
}

const Board = ({ children }) => {
    const { gameLogic } = useGameContext();
    const { centerBoard, leftBoard, rightBoard} = gameLogic.boards
    return (
        <div className="h-2/3 w-100 ">
            <div className="flex flex-row">
                <div className="flex flex-col m-2 space-y-10">
                    {children}
                </div>
                <div className="flex flex-col justify-center">
                    {
                        leftBoard.map((row, index) => (
                            <BoardField key={row.id} row={row}></BoardField>
                        ))
                    }
                </div>
                <div className="flex flex-col flex-grow m-5">
                    {
                        centerBoard.map((row, index) => (
                            <BoardField key={row.id} row={row}></BoardField>
                        ))
                    }
                </div>
                <div className="flex flex-col justify-center">
                    {
                        rightBoard.map((row, index) => (
                            <BoardField key={row.id} row={row}></BoardField>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Board