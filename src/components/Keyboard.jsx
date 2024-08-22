import React from 'react';
import './styles/keyboard.css';

const Keyboard = ({ onKeyPress, feedback, disabled }) => {
    const rows = [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫ ']
    ];

    const getFeedbackClass = (key) => {
        switch (feedback[key]) {
            case 'correct': return 'key-correct';
            case 'present': return 'key-present';
            case 'absent': return 'key-absent';
            default: return '';
        }
    };

    return (
        <div className="keyboard">
            {rows.map((row, rowIndex) => (
                <div key={rowIndex} className="keyboard-row">
                    {row.map((key) => (
                        <button
                            key={key}
                            className={`key ${key.length > 1 ? 'wide-key' : ''} ${getFeedbackClass(key)}`}
                            onClick={() => onKeyPress(key)}
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