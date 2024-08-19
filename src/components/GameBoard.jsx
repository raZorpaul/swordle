import React, { useEffect, useState, useRef } from "react";
import './styles/GameBoard.css';
import getFeedback from "../utils/wordUtils"; // Assuming getFeedback function is correctly imported
import Modal from "./Modal";

const colms = 5;
const rows = 6;

export default function GameBoard() {
    const [word, setWord] = useState([]);
    const [currentRow, setCurrentRow] = useState(0);
    const [previousRows, setPreviousRows] = useState([]);
    const [usedWords, setUsedWords] = useState([]);
    // const [challengeWord, setChallengeWord] = useState('');
    const [feedbackRows, setFeedbackRows] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');


    // const swahili_words = ["mboga", "chafu", "panda", "nyota", "kitabu"];

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const swahili_words = ["mboga", "chafu", "panda", "nyota", "kitabu"];
    const [challengeWord] = useState(() => {
        let availableWords = swahili_words.filter(word => !usedWords.includes(word));
        const randomIndex = Math.floor(Math.random() * availableWords.length);
        return availableWords[randomIndex];
    });

    useEffect(() => {
        console.log(challengeWord);

        return () => {
            console.log("Cleanup function"); // Optional: Cleanup function example
        };
    }, []); // Empty dependency array ensures it only logs once on mount
    

    // const handleKeyDown = (event) => {
    //     const isLetter = /^[a-zA-Z]$/.test(event.key); // Check if the key is a letter

    //     if (!isLetter) {
    //         return; // Ignore the event if it is not a letter
    //     }

        
    //     const wordLength = word.length;
    //     if (event.key.length === 1 && wordLength < 5) {
    //         setWord(prevWords => [...prevWords, event.key]);
    //     } else if (event.key === 'Backspace') {
    //         setWord(prevWords => [...prevWords].slice(0, -1));
    //     } else if (event.key === 'Enter' && wordLength === 5) {
    //         const userGuess = word.join('');
    //         const feedback = getFeedback(challengeWord, userGuess); // Call getFeedback with challengeWord and user's guess
    //         setFeedbackRows(prevFeedbackRows => [...prevFeedbackRows, feedback]);
    //         setPreviousRows(prevRows => [...prevRows, { challengeWord, userGuess }]);
    //         setWord([]);
    //         setCurrentRow(prevRow => prevRow + 1);
    
    //         // Check if the user has won
    //         const isRowCorrect = feedback.every(feedbackItem => feedbackItem === '🟩');
    //         if (isRowCorrect) {
    //             gameOver(true); // Trigger win modal

    //             console.log("you won")
    //             console.log(currentRow)
    //         } else if (currentRow + 1 === rows) {
    //             gameOver(false); // Trigger loss modal if no more attempts left
    //         }
    //     }
    // };
    
    const handleKeyDown = (event) => {
        const isLetter = /^[a-zA-Z]$/.test(event.key); // Check if the key is a letter
    
        // Handle specific keys first
        if (event.key === 'Backspace') {
            setWord(prevWords => [...prevWords].slice(0, -1));
            return; // Exit after handling Backspace
        }
    
        if (event.key === 'Enter') {
            const wordLength = word.length;
            if (wordLength === 5) {
                const userGuess = word.join('');
                const feedback = getFeedback(challengeWord, userGuess); // Call getFeedback with challengeWord and user's guess
                setFeedbackRows(prevFeedbackRows => [...prevFeedbackRows, feedback]);
                setPreviousRows(prevRows => [...prevRows, { challengeWord, userGuess }]);
                setWord([]);
                setCurrentRow(prevRow => prevRow + 1);
        
                // Check if the user has won
                const isRowCorrect = feedback.every(feedbackItem => feedbackItem === '🟩');
                if (isRowCorrect) {
                    gameOver(true); // Trigger win modal
                    console.log("you won");
                    console.log(currentRow);
                } else if (currentRow + 1 === rows) {
                    gameOver(false); // Trigger loss modal if no more attempts left
                }
            }
            return; // Exit after handling Enter
        }
    
        // Ignore non-letter characters
        if (!isLetter) {
            return; // Ignore the event if it is not a letter
        }
    
        const wordLength = word.length;
        if (event.key.length === 1 && wordLength < 5) {
            setWord(prevWords => [...prevWords, event.key]);
        }
    };



    const checkGameOver = (row) => {
        if (row < currentRow && feedbackRows[row]) {
            const isRowCorrect = feedbackRows[row].every(feedback => feedback === '🟩');
            if (isRowCorrect) {
                gameOver(true); // Call gameOver function with win = true
                return true;
            }
        }
        return false;
    };

    const gameOver = (isWin) => {
        if (isWin) {
            setModalMessage("Congratulations! You've won!");
        } else {
            setModalMessage("You've lost the game. Try again!");
        }
        setIsModalOpen(true); // Open the modal with the appropriate message
        // Optionally disable further input or handle the end of the game
        // setIsGameActive(false);
    };
    


    // useEffect(() => {
    //     window.addEventListener('keydown', handleKeyDown);
    //     return () => {
    //         window.removeEventListener('keydown', handleKeyDown);
    //     };
    // }, [word, currentRow]);
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [word, currentRow]);
    

    return (
        <div>
            {/* <p>KEYS PRESSED ARE: {word} </p> */}
            <div className="gameboard">
                {
                Array(rows).fill(0).map((_, row) => {
                    // const isGameOver = checkGameOver(row);
                    
                    return Array(colms).fill(0).map((_, col) => {
                        const index = row * colms + col;
                        let cellClass = 'cell';
                        let letter = '';

                        if (row < currentRow && feedbackRows[row]) {
                            const feedback = feedbackRows[row][col];
                            letter = previousRows[row]?.userGuess[col] || '';
                            if (feedback === '🟩') {
                                cellClass += ' correct';
                            } else if (feedback === '🟨') {
                                cellClass += ' present';
                            } else  {
                                cellClass += ' incorrect';
                            }
                        }  else if (row === currentRow) {
                            letter = (word[col] || '').toUpperCase();
                        }

                        
                        return (
                            <div key={`${row}-${col}`} className={cellClass}>
                                {letter.toUpperCase()}
                            </div>
                        );
                    });
                })
                }
            </div>
            {isModalOpen && (
                // Modal()
                <Modal isOpen={true} onClose={handleCloseModal} message="Congratulations" />
        )}
        </div>
    );
}
