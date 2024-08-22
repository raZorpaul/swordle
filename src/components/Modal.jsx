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
                <div className="modal-howtoPlay">
                    <h2 className="modal-title">Jinsi Ya Kucheza</h2>
                    <p className="modal-subtitle">Nadhani Neno katika majaribio 6.</p>
                    <ul className="modal-list">
                        <li>Kila nadhani lazima iwe neno halali la herufi 5.</li>
                        <li>Rangi ya vigae itabadilika ili kuonyesha jinsi nadhani yako ilivyokuwa karibu na neno.</li>
                    </ul>
                </div>
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