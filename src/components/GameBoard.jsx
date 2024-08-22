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
    const { guesses, handleSubmit: submitFeedback, getFeedback } = Feedback();
    const [challengeWord, setChallengeWord] = useState(() => {
        return wordList[Math.floor(Math.random() * wordList.length)];
    });
    const [word, setWord] = useState([]);
    const [currentRow, setCurrentRow] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [animatingCells, setAnimatingCells] = useState([]);
    const [pendingFeedback, setPendingFeedback] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    const [lastGuess, setLastGuess] = useState(null);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleSubmit = useCallback((challengeWord, userGuess) => {
        // ... (your existing handleSubmit logic)

        if (userGuess === challengeWord || currentRow === rows - 1) {
            setGameOver(true);
            setIsModalOpen(true);
            setModalMessage(userGuess === challengeWord ? "You've guessed the word correctly!" : "Game Over. The word was " + challengeWord);
        }
        submitFeedback(challengeWord, userGuess);
    }, [submitFeedback, currentRow /* ... other dependencies ... */]);

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
                    setLastGuess(feedback);
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
    }, [colms]);

    useEffect(() => {
        if (lastGuess) {
            const isRowCorrect = lastGuess.every(feedbackItem => feedbackItem === '🟩');
            if (isRowCorrect || currentRow === rows) {
                const modalDelay = 4500; // 1.5 seconds after animation completes
                setTimeout(() => {
                    setGameOver(true);
                    setIsModalOpen(true);
                    setModalMessage(isRowCorrect ? "You've guessed the word correctly!" : "Game Over. The word was " + challengeWord);
                }, modalDelay);
            }
        }
    }, [lastGuess, currentRow, rows, challengeWord]);

    const handleKeyPress = useCallback((key) => {
        if (gameOver || animatingCells.length > 0) return; // Ignore input if game is over or during animation

        if (/^[A-Z]$/.test(key) && word.length < 5) {
            setWord(prevWords => [...prevWords, key]);
        } else if (key === 'BACKSPACE' || key === '⌫') {
            setWord(prevWords => prevWords.slice(0, -1));
        } else if (key === 'ENTER' && word.length === 5) {
            const userGuess = word.join('');
            const feedback = getFeedback(challengeWord, userGuess);
            animateRow(feedback);
            handleSubmit(challengeWord, userGuess);
        }
    }, [word, handleSubmit, animateRow, animatingCells.length, challengeWord, getFeedback, gameOver]);

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
                            const { word: guessWord, feedback } = guesses[row];
                            letter = guessWord[col];
                            cellClass += getFeedbackClass(feedback[col]);
                        } else if (row === currentRow) {
                            letter = (word[col] || '').toUpperCase();
                            if (animatingCells.includes(col)) {
                                cellClass += ' animate-flip';
                            }
                            if (pendingFeedback && pendingFeedback[col]) {
                                cellClass += getFeedbackClass(pendingFeedback[col]);
                            }
                        }

                        return (
                            <div key={`${row}-${col}`} className={cellClass}>
                                {letter.toUpperCase()}
                            </div>
                        );
                    });
                })}
            </div>
            {isModalOpen && (
                <Modal isOpen={true} onClose={handleCloseModal} message={modalMessage} />
            )}

            <div className='keyboard-section'>
                <Keyboard onKeyPress={handleKeyPress} disabled={gameOver} />
            </div>
        </div>
    );
}

function getFeedbackClass(feedback) {
    switch (feedback) {
        case '🟩': return ' correct';
        case '🟨': return ' present';
        default: return ' incorrect';
    }
}