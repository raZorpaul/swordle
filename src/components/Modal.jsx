import React from 'react';
import './styles/Modal.css';
import congratsImage from '../assets/congrats.png';
import gameOverImage from '../assets/gameover.png';


const ExampleWord = ({ word, highlightIndex, highlightType }) => {
    return (
      <div className="example-word">
        {word.split('').map((letter, index) => (
          <div 
            key={index} 
            className={`example-letter ${index === highlightIndex ? highlightType : ''}`}
          >
            {letter}
          </div>
        ))}
      </div>
    );
  };

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
                    <h3 className="examples-title">Mifano</h3>
                    <ExampleWord word="SAFARI" highlightIndex={0} highlightType="correct" />
                    <p className="example-explanation">S is in the word and in the correct spot.</p>
                    <ExampleWord word="NYOTA" highlightIndex={1} highlightType="present" />
                    <p className="example-explanation">Y kwenye neno lakini katika doa mbaya.</p>
                    <ExampleWord word="NIAJA" highlightIndex={3} highlightType="absent" />
                    <p className="example-explanation">J haipo katika neno mahali popote.</p>
                </div>
            );
            break;
        case 'gameOver':
            image = gameOverImage;
            content = (
                <>
                    <h2 className="modal-title">Mchezo Umeisha</h2>
                    <p className="modal-message">{message}</p>
                </>
            );
            break;
        case 'congrats':
            image = congratsImage;
            content = (
                <>
                    <h2 className="modal-title">HONGERA</h2>
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