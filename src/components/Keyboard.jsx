import React from 'react';
import './styles/keyboard.css';

const Keyboard = ({ onKeyPress, disabled }) => {
  const handleKeyClick = (key) => {
    if (!disabled) {
      onKeyPress(key);
    }
  };

  const keys = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫'],
  ];

  /* new shite*/

  return (
    <div className={`keyboard ${disabled ? 'disabled' : ''}`}>
      {keys.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.map((key) => (
            <button
              key={key}
              className={`key ${key === 'ENTER' || key === '⌫' ? 'wide-key' : ''}`}
              onClick={() => handleKeyClick(key === '⌫' ? 'BACKSPACE' : key)}
              disabled={disabled}
            >
              {key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;