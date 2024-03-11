import GameRules from '../Gamefiles/game.json'
import { useGameContext } from '../Game/Game';
import Card from '../Hand/Hand';
import { useState } from 'react';

interface BoardRow {
    name: string
    size: number
    type: string
    style: string
    slots: []
}


const BoardField = (row: BoardRow) => {
    row = row.row
    const { gameLogic } = useGameContext();
    const { selectedCard } = gameLogic.selectedCard

    const [rowList, setRowList ] = useState([])

    return (
        <div className="flex flex-row justify-center space-x-5 m-2">
            {
                Array.from({ length: row.size }, (_, __) => (
                    <>
                        <div onClick={() => {gameLogic.placeCard("center", selectedCard)}} className="rounded-sm border-2 w-44 h-64 border-black">
                        </div>
                    </>
                ))
            }
        </div>
    )
}

const Board = ({ children }) => {

    return (
        <div className="h-2/3 w-100 ">
            <div className="flex flex-row">
                <div className="flex flex-col m-2 space-y-10">
                    {children}
                </div>
                <div className="flex flex-col justify-center">
                    {
                        GameRules.boards.left.map((row, index) => (
                            <BoardField key={row.id} row={row}></BoardField>
                        ))
                    }
                </div>
                <div className="flex flex-col flex-grow m-10">
                    {
                        GameRules.boards.center.map((row, index) => (
                            <BoardField key={row.id} row={row}></BoardField>
                        ))
                    }
                </div>
                <div className="flex flex-col justify-center">
                    {
                        GameRules.boards.right.map((row, index) => (
                            <BoardField key={row.id} row={row}></BoardField>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Board