from flask import Flask, request, jsonify
import random
from flask_cors import CORS, cross_origin
app = Flask(__name__)

# Sample list of Swahili words
swahili_words = ["mboga", "chafu", "panda", "nyota", "kitabu"];
# Function to choose a random word
def choose_word(words):
    return random.choice(words)

# Function to provide feedback on a guess
def get_feedback(guess, actual):
    feedback = ["⬜"] * 5
    for i, char in enumerate(guess):
        if char == actual[i]:
            feedback[i] = "🟩"
        elif char in actual:
            feedback[i] = "🟨"
    return feedback

# Choose a random word
actual_word = choose_word(swahili_words)

@app.route('/guess', methods=['POST'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])

def handle_guess():
    guess = request.json['guess']
    if len(guess) != 5:
        return jsonify({'error': 'Please enter a 5-letter word.'})
    feedback = get_feedback(guess, actual_word)
    if guess == actual_word:
        return jsonify({'feedback': feedback, 'won': True})
    else:
        return jsonify({'feedback': feedback, 'won': False})

if __name__ == '__main__':
    app.run(debug=True)