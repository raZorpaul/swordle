import { useState } from 'react'
import './App.css'
import GameBoard from './components/GameBoard'
import NavBar from './components/Navbar'
import Modal from './components/Modal'

function App() {
  const [showHelpModal, setShowHelpModal] = useState(false)

  const handleHelpClick = () => {
    setShowHelpModal(true)
  }

  const handleCloseHelpModal = () => {
    setShowHelpModal(false)
  }

  return (
    <div className="app">
      <NavBar onHelpClick={handleHelpClick} />
      <div className="mainContent">
        <GameBoard />
      </div>
      {showHelpModal && (
        <Modal
          isOpen={true}
          onClose={handleCloseHelpModal}
          message="Here are the game rules and instructions..."
        />
      )}
    </div>
  )
}

export default App