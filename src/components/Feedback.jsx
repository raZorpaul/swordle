import React, { useState, useCallback } from 'react';

const Feedback = () => {
    const [guesses, setGuesses] = useState([]);

    const getFeedback = useCallback((challengeWord, guessWord) => {
        const feedback = Array(5).fill('⬛'); // Start with all grey
        const challengeLetters = [...challengeWord.toUpperCase()];
        const guessLetters = [...guessWord.toUpperCase()];

        // First pass: Mark correct letters (green)
        for (let i = 0; i < 5; i++) {
            if (guessLetters[i] === challengeLetters[i]) {
                feedback[i] = '🟩';
                challengeLetters[i] = null; // Mark as used
                guessLetters[i] = null; // Mark as used
            }
        }

        // Second pass: Mark present letters (yellow)
        for (let i = 0; i < 5; i++) {
            if (guessLetters[i] !== null) {
                const index = challengeLetters.indexOf(guessLetters[i]);
                if (index !== -1) {
                    feedback[i] = '🟨';
                    challengeLetters[index] = null; // Mark as used
                }
            }
        }

        return feedback;
    }, []);

    const handleSubmit = useCallback((challengeWord, guess) => {
        const newFeedback = getFeedback(challengeWord, guess);
        setGuesses(prevGuesses => [...prevGuesses, { word: guess, feedback: newFeedback }]);
        return newFeedback; // Return the feedback
    }, [getFeedback]);

    return {
        guesses,
        handleSubmit,
        getFeedback,
    };
};

export default Feedback;