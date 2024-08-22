import React from 'react';
import './styles/Modal.css';
import congratsImage from '../assets/congrats.png'; // Adjust the path as needed

export default function Modal({ isOpen, onClose, message }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>×</button>
                <div className="modal-icon">
                    <img src={congratsImage} alt="Congratulations" width="56" height="56" />
                </div>
                <h2 className="modal-title">Congratulations!</h2>
                <p className="modal-message">{message}</p>
            </div>
        </div>
    );
}