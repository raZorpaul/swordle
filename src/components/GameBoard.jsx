import React, { useEffect, useState, useCallback } from "react";
import './styles/GameBoard.css';
import Feedback from "./Feedback";
import Modal from "./Modal";

const colms = 5;
const rows = 6;

// Array of possible challenge words
const wordList = [
    "PANDA", "APPLE", "BEACH", "CLOUD", "DANCE", 
    "EAGLE", "FLAME", "GRAPE", "HOUSE", "IVORY", 
    "JELLY", "KITE", "LEMON", "MANGO", "NOBLE", 
    "OCEAN", "PIANO", "QUEEN", "RIVER", "SOLAR"
];

export default function GameBoard() {
    const { guesses, handleSubmit, getFeedback } = Feedback();
    const [challengeWord, setChallengeWord] = useState(() => {
        return wordList[Math.floor(Math.random() * wordList.length)];
    });
    const [word, setWord] = useState([]);
    const [currentRow, setCurrentRow] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [animatingCells, setAnimatingCells] = useState([]);
    const [pendingFeedback, setPendingFeedback] = useState(null);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const gameOver = (isWin) => {
        if (isWin) {
            setModalMessage("Congratulations! You've won!");
        } else {
            setModalMessage("You've lost the game. Try again!");
        }
        setIsModalOpen(true);
    };

    const animateRow = useCallback((feedback) => {
        const animationDuration = 350; // ms
        // const delayBetweenCells = 20000; // ms

        const animateNextCol = (col) => {
            if (col >= colms) {
                // Animation complete
                setTimeout(() => {
                    setAnimatingCells([]);
                    setPendingFeedback(null);
                    setCurrentRow(prevRow => prevRow + 1);
                    setWord([]);

                    // Check if the user has won
                    const isRowCorrect = feedback.every(feedbackItem => feedbackItem === '🟩');
                    if (isRowCorrect) {
                        gameOver(true);
                    } else if (currentRow + 1 === rows) {
                        gameOver(false);
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
    }, [currentRow, gameOver]);

    const handleKeyDown = useCallback((event) => {
        const isLetter = /^[a-zA-Z]$/.test(event.key);

        if (animatingCells.length > 0) return; // Ignore input during animation

        if (isLetter && word.length < 5) {
            setWord(prevWords => [...prevWords, event.key]);
        } else if (event.key === 'Backspace') {
            setWord(prevWords => prevWords.slice(0, -1));
        } else if (event.key === 'Enter' && word.length === 5) {
            const userGuess = word.join('');
            const feedback = getFeedback(challengeWord, userGuess);
            animateRow(feedback);
            handleSubmit(challengeWord, userGuess);
        }
    }, [word, handleSubmit, animateRow, animatingCells.length, challengeWord, getFeedback]);

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
        <div>
            <div className="gameboard">
                {Array(rows).fill(0).map((_, row) => {
                    return Array(colms).fill(0).map((_, col) => {
                        let cellClass = 'cell';
                        let letter = '';

                        if (row < currentRow) {
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