import React from "react";


export default function getFeedback(guess, actual) {
    let feedback = ["⬜", "⬜", "⬜", "⬜", "⬜"];
    for (let i = 0; i < guess.length; i++) {
      if (guess[i] === actual[i]) {
        feedback[i] = "🟩";
      } else if (actual.includes(guess[i])) {
        feedback[i] = "🟨";
      }
    }
    return feedback;
}
// Function to compare user input word with the challenge word and provide colored feedback tiles
// function getFeedback(userWord, challengeWord) {
//   const userChars = userWord.split('');
//   const challengeChars = challengeWord.split('');
//   const feedback = [];

//   // Check for correct positions (green), incorrect positions (yellow), or no feedback
//   for (let i = 0; i < challengeChars.length; i++) {
//       if (userChars[i] === challengeChars[i]) {
//           feedback.push(<div key={i} className="cell" style={{ backgroundColor: 'green' }}>{userChars[i]}</div>);
//       } else if (challengeChars.includes(userChars[i])) {
//           feedback.push(<div key={i} className="cell" style={{ backgroundColor: 'yellow' }}>{userChars[i]}</div>);
//       } else {
//           feedback.push(<div key={i} className="cell">{userChars[i]}</div>);
//       }
//   }

//   return feedback;
// }

// export default getFeedback;
