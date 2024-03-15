import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Hand from './Hand/Hand.tsx'
import Deck from './Deck/Deck.tsx'
import Discard from './Discard/Discard.tsx'
import Board from './Board/Board.tsx'
import { MenuDeck } from './MenuDeck/MenuDeck.tsx';
import { Commander } from './Commander/Commander.tsx'
import { DeckBuilder } from './DeckBuilder/DeckBuilder.tsx';
import { StartMenu } from './StartMenu/StartMenu.tsx';
import { DoubleSession } from './DoubleSession/DoubleSession.tsx';

import GameProvider from './Game/Game.tsx'


import './main.css'

if (!sessionStorage.getItem("active_deck")) {
  sessionStorage.setItem("active_deck", '[]')
}

const router = createBrowserRouter([
  {
    path: "/game",
    element: (
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
    ),
  },
  {
    path: "/deck-builder",
    element: <DeckBuilder />
  },
  {
    path: "/",
    element: <StartMenu />
  },
  {
    path: "/double-session",
    element: <DoubleSession />
  }
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
