import React from 'react';
import './css/ScoreBoard.css';

const ScoreBoard = ({scores}) => (
    <ul className="score-board">
        <li>Correct: {scores.correct}</li>
        <li>Incorrect: {scores.incorrect}</li>
    </ul>
)
export default ScoreBoard 