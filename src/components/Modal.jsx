import React from 'react';
import './styles/Modal.css';
import congratsImage from '../assets/congrats.png';
import gameOverImage from '../assets/gameover.png';

export default function Modal({ isOpen, onClose, type, message }) {
    if (!isOpen) return null;

    let content;
    let image;

    switch (type) {
        case 'howToPlay':
            content = (
                <>
                    <h2 className="modal-title">How To Play</h2>
                    <p className="modal-subtitle">Guess the Wordle in 6 tries.</p>
                    <ul className="modal-list">
                        <li>Each guess must be a valid 5-letter word.</li>
                        <li>The color of the tiles will change to show how close your guess was to the word.</li>
                    </ul>
                </>
            );
            break;
        case 'gameOver':
            image = gameOverImage;
            content = (
                <>
                    <h2 className="modal-title">Game Over</h2>
                    <p className="modal-message">{message}</p>
                </>
            );
            break;
        case 'congrats':
            image = congratsImage;
            content = (
                <>
                    <h2 className="modal-title">Congratulations!</h2>
                    <p className="modal-message">{message}</p>
                </>
            );
            break;
        default:
            content = <p className="modal-message">{message}</p>;
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>&times;</button>
                {image && <img src={image} alt="Modal icon" className="modal-icon" />}
                {content}
            </div>
        </div>
    );
}