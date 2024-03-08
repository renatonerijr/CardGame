import React from 'react'
import ReactDOM from 'react-dom/client'
import Hand from './Hand/Hand.tsx'
import Deck from './Deck/Deck.tsx'
import GameProvider from './Game/Game.tsx'
import './main.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GameProvider>
      <Hand />
      <Deck />
    </GameProvider>
  </React.StrictMode>,
)
