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

export default function Modal({ isOpen, onClose, type, message, onShare}) {
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
                    <button onClick={onShare} className="share-button">
                        Share
                        <span className="share-icons">
                            <svg className="share-icon small" viewBox="0 0 24 24">
                                <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
                            </svg>
                            {/* <svg className="share-icon large" viewBox="0 0 24 24">
                                <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
                            </svg> */}
                        </span>
                    </button>
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