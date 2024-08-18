import React, { useEffect, useState } from "react";
import './styles/GameBoard.css';
import getFeedback from "../utils/wordUtils"; // Assuming getFeedback function is correctly imported

const colms = 5;
const rows = 6;

export default function GameBoard() {
    const [word, setWord] = useState([]);
    const [currentRow, setCurrentRow] = useState(0);
    const [previousRows, setPreviousRows] = useState([]);
    const [usedWords, setUsedWords] = useState([]);
    const [challengeWord, setChallengeWord] = useState('');
    const [feedbackRows, setFeedbackRows] = useState([]);

    const swahili_words = ["mboga", "chafu", "panda", "nyota", "kitabu"];

   

    const selectChallengeWord = () => {
        let availableWords = swahili_words.filter(word => !usedWords.includes(word));
            const randomIndex = Math.floor(Math.random() * availableWords.length);
            const a = availableWords[randomIndex]
            console.log(a)
            setChallengeWord(a)
    }; 


    useEffect(() => {
        selectChallengeWord();
        
        return () => {
            console.log("Cleanup function"); // Optional: Cleanup function example
        };
    }, []); // Ensure the dependency array is empty if you want it to run only on mount
    

    const handleKeyDown = (event) => {
        const wordLength = word.length;
        if (event.key.length === 1 && wordLength < 5) {
            setWord(prevWords => [...prevWords, event.key]);
        } else if (event.key === 'Backspace') {
            setWord(prevWords => [...prevWords].slice(0, -1));
        } else if (event.key === 'Enter' && wordLength === 5) {
            const userGuess = word.join('');
            const feedback = getFeedback(challengeWord, userGuess); // Call getFeedback with challengeWord and user's guess
            setFeedbackRows(prevFeedbackRows => [...prevFeedbackRows, feedback]);
            setPreviousRows(prevRows => [...prevRows, { challengeWord, userGuess }]);
            setWord([]);
            setCurrentRow(currentRow + 1);
            // selectChallengeWord();
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [word, currentRow]);

    return (
        <div>
            <p>KEYS PRESSED ARE: {word} </p>
            <div className="gameboard">
                {
                    Array(rows).fill(0).map((_, row) => (
                        Array(colms).fill(0).map((_, col) => {
                            const index = row * colms + col;
                            return (
                                <div key={`${row}-${col}`} className={'cell'}>
                                    {row < currentRow ? (
                                        feedbackRows[row] ? feedbackRows[row][col] : ''
                                    ) : ''}
                                </div>
                            );
                        })
                    ))
                }
            </div>
        </div>
    );
}
