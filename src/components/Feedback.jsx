import React, { useState } from 'react';

const Feedback = () => {
    const [challengeWord, setChallengeWord] = useState('');
    const [feedback, setFeedback] = useState({});

    const getFeedback = (guess) => {
        const feedback = {};
        for (let i = 0; i < 5; i++) {
            if (guess[i] === challengeWord[i]) {
                feedback[`${i}`] = 'green';
            } else if (challengeWord.includes(guess[i])) {
                feedback[`${i}`] = 'orange';
            }
        }
        return feedback;
    };

    const handleSubmit = (guess) => {
        const newFeedback = getFeedback(guess);
        setFeedback((prevFeedback) => {
            return { ...prevFeedback, ...newFeedback };
        });
    };

    return {
        challengeWord,
        feedback,
        handleSubmit,
    };
};

export default Feedback;