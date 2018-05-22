import React from 'react';

const ScoreBoard = ({scores}) => (
    <div>
        <p>Number of wrong answers: {scores.incorrect}</p>
        <p>Number of right answers: {scores.correct}</p>
    </div>
)
export default ScoreBoard 