import React, { useEffect, useState } from "react";
import './styles/GameBoard.css'; // Add .css extension
// import Feedback from "./Feedback";
import Gamelogic from "./Gamelogic";
import getFeedback from "../utils/wordUtils";


const colms = 5;
const rows = 6;


export default function GameBoard() {

    const [word, setWord] = useState([]);
    const [flip, setFlip] = useState(false);
    const [currentRow, setCurrentRow] = useState(0)
    const [backgroundColor, setBackgroundColor] = useState({});
    const [previousRows, setPreviousRows] = useState([]); // Store previous rows
    const swahili_words = ["mboga", "chafu", "panda", "nyota", "kitabu"];
    // const { challengeWord, feedback, handleSubmit } = Feedback();



    const wordLength = word.length
    const handleKeyDown = (event) => {
        // check if the array word has a length of 5
        if(event.key.length === 1 && wordLength < 5) {
            // console.log("you pressed:",event.key)
            setWord((prevWords) => {
                const x = [...prevWords, event.key]
                // console.log(x)
                // console.log(currentRow)
                return x 
            })
        }
        else if (event.key === 'Backspace') {
            setWord((prevWords) => {
                return [...prevWords].slice(0, -1);
            });
        } else if(event.key === 'Enter' && wordLength === 5) {
            console.log(
                // getFeedback(word, swahili_words)
            )
            // setPreviousRows((prevRows) => [...prevRows, word.join('')]);
            setPreviousRows((prevRows) => {
                const newrow = [...prevRows, word.join('')]
                console.log(newrow)
                return newrow
            })
            // setWord(Array(colms).fill(''));
            setWord([])
            setCurrentRow(currentRow + 1); // Move to the next row
        }
    };


    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
    
        // cleanup this component
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [wordLength, currentRow]);
    

    // const flipper = `cell ${flip && row === 0 && col === 0 ? 'flip': ''}`;

    return (
        <div>
            <p>KEYS PRESSED ARE :{word} </p>
            <div className="gameboard">
            {
                    Array(rows).fill(0).map((_, row) => (
                        Array(colms).fill(0).map((_, col) => {
                            const index = row * colms + col;
                            return (
                                <div key={`${row}-${col}`} className={'cell'}>
                                    {/* { row === currentRow ? (index < word.length ? word[index] : '') : '' } */}
                                    { row === currentRow && col < word.length ? word[col]: ( row < currentRow ? previousRows[row][col] : '')}
                                </div>
                            );
                        })
                    ))
                }
            </div>
            {/* {won && <p>Congratulations, you guessed the word!</p>}
            <p>Feedback: {feedback.join(' ')}</p> */}
        </div>
    )
}