import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import GameBoard from './components/GameBoard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app">
      <div className="mainContent">
        <GameBoard />
      </div>
    </div>
  )
}

export default App
