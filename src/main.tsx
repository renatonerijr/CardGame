import React from 'react'
import ReactDOM from 'react-dom/client'
import Hand from './Hand/Hand.tsx'
import Deck from './Deck/Deck.tsx'
import Discard from './Discard/Discard.tsx'
import Board from './Board/Board.tsx'
import { MenuDeck } from './MenuDeck/MenuDeck.tsx';
import { Commander } from './Commander/Commander.tsx'
import GameProvider from './Game/Game.tsx'
import './main.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GameProvider>
      <div className='w-screen h-screen'>
          <MenuDeck />
          <Board>
            <Discard />
            <Deck />
            <Commander />
          </Board>
          <Hand />
      </div>
    </GameProvider>
  </React.StrictMode>,
)
