import React, { useEffect, useState, useCallback } from "react";
import './styles/GameBoard.css';
import Feedback from "./Feedback";
import Modal from "./Modal";
import Keyboard from "./Keyboard.jsx";

const colms = 5;
const rows = 6;
/* new shite */
// Array of possible challenge words
const wordList = [
    "PANDA", "APPLE", "BEACH", "CLOUD", "DANCE", 
    "EAGLE", "FLAME", "GRAPE", "HOUSE", "IVORY", 
    "JELLY", "KITE", "LEMON", "MANGO", "NOBLE", 
    "OCEAN", "PIANO", "QUEEN", "RIVER", "SOLAR"
];

export default function GameBoard() {
    const { getFeedback } = Feedback();
    const [challengeWord, setChallengeWord] = useState(() => {
        return wordList[Math.floor(Math.random() * wordList.length)];
    });
    const [word, setWord] = useState([]);
    const [currentRow, setCurrentRow] = useState(0);
    const [guesses, setGuesses] = useState([]);
    const [keyFeedback, setKeyFeedback] = useState({});
    const [animatingCells, setAnimatingCells] = useState([]);
    const [pendingFeedback, setPendingFeedback] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [gameOver, setGameOver] = useState(false);
    const [lastGuess, setLastGuess] = useState(null);

    const checkGuess = useCallback((guess) => {
        const newKeyFeedback = { ...keyFeedback };
        for (let i = 0; i < guess.length; i++) {
            const letter = guess[i].toUpperCase();
            if (challengeWord[i] === letter) {
                newKeyFeedback[letter] = 'correct';
            } else if (challengeWord.includes(letter) && newKeyFeedback[letter] !== 'correct') {
                newKeyFeedback[letter] = 'present';
            } else if (!challengeWord.includes(letter)) {
                newKeyFeedback[letter] = 'absent';
            }
        }
        setKeyFeedback(newKeyFeedback);
    }, [challengeWord, keyFeedback]);

    const animateRow = useCallback((feedback) => {
        const animationDuration = 350; // ms
        const totalAnimationTime = animationDuration * colms;

        const animateNextCol = (col) => {
            if (col >= colms) {
                // Animation complete
                setTimeout(() => {
                    setAnimatingCells([]);
                    setPendingFeedback(null);
                    setCurrentRow(prevRow => prevRow + 1);
                    setWord([]);

                    // Check if the game is over after animation
                    const isRowCorrect = feedback.every(f => f === '🟩');
                    if (isRowCorrect || currentRow === rows - 1) {
                        setGameOver(true);
                        setIsModalOpen(true);
                        setModalMessage(isRowCorrect 
                            ? "You've guessed the word correctly!" 
                            : `Game Over. The word was ${challengeWord}`
                        );
                    }
                }, animationDuration / 2);
                return;
            }

            setAnimatingCells(prev => [...prev, col]);
            setTimeout(() => {
                setPendingFeedback(prev => {
                    const newFeedback = [...(prev || Array(5).fill(null))];
                    newFeedback[col] = feedback[col];
                    return newFeedback;
                });
                animateNextCol(col + 1);
            }, animationDuration);
        };

        animateNextCol(0);
    }, [colms, currentRow, rows, challengeWord]);

    const handleSubmit = useCallback((challengeWord, userGuess) => {
        const feedback = getFeedback(challengeWord, userGuess);
        
        setGuesses(prevGuesses => [...prevGuesses, { word: userGuess, feedback }]);
        checkGuess(userGuess);
        animateRow(feedback);
    }, [getFeedback, checkGuess, animateRow]);

    const handleKeyPress = useCallback((key) => {
        if (gameOver || animatingCells.length > 0) return; // Ignore input if game is over or during animation

        if (/^[A-Z]$/.test(key) && word.length < 5) {
            setWord(prevWords => [...prevWords, key]);
        } else if (key === 'BACKSPACE' || key === '⌫') {
            setWord(prevWords => prevWords.slice(0, -1));
        } else if (key === 'ENTER' && word.length === 5) {
            const userGuess = word.join('');
            handleSubmit(challengeWord, userGuess);
        }
    }, [word, handleSubmit, animatingCells.length, challengeWord, getFeedback, gameOver]);

    const handleKeyDown = useCallback((event) => {
        if (gameOver) return; // Ignore keyboard input if game is over

        const key = event.key.toUpperCase();
        if (key === 'BACKSPACE') {
            handleKeyPress('BACKSPACE');
        } else if (key === 'ENTER') {
            handleKeyPress('ENTER');
        } else if (/^[A-Z]$/.test(key)) {
            handleKeyPress(key);
        }
    }, [handleKeyPress, gameOver]);

    const handleCloseModal = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    useEffect(() => {
        console.log("Challenge word:", challengeWord);
    }, [challengeWord]);

    return (
        <div className={'layout'}>
            <div className="gameboard">
                {Array(rows).fill(0).map((_, row) => {
                    return Array(colms).fill(0).map((_, col) => {
                        let cellClass = 'cell';
                        let letter = '';

                        if (row < currentRow && guesses[row]) {
                            letter = guesses[row].word[col];
                            cellClass += ` ${getFeedbackClass(guesses[row].feedback[col])}`;
                        } else if (row === currentRow) {
                            letter = (word[col] || '').toUpperCase();

                            if(animatingCells.includes(col)) {
                                cellClass += ' animate-flip';
                            }
                            if (animatingCells.includes(col) && pendingFeedback) {
                                cellClass += ` ${getFeedbackClass(pendingFeedback[col])} animate-flip`;
                            }
                        }

                        return (
                            <div key={`${row}-${col}`} className={cellClass}>
                                {letter}
                            </div>
                        );
                    });
                })}
            </div>
            {isModalOpen && (
                <Modal isOpen={true} onClose={handleCloseModal} message={modalMessage} />
            )}

            <div className='keyboard-section'>
                <Keyboard onKeyPress={handleKeyPress} feedback={keyFeedback} disabled={gameOver} />
            </div>
        </div>
    );
}

function getFeedbackClass(feedback) {
    switch (feedback) {
        case '🟩': return 'correct';
        case '🟨': return 'present';
        case '⬛': return 'incorrect';
        default: return '';
    }
}