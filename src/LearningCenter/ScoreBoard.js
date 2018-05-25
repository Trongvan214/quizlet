import React from 'react';

const ScoreBoard = ({scores}) => (
    <div>
        <p>Number of right answers: {scores.correct}</p>
        <p>Number of wrong answers: {scores.incorrect}</p>
    </div>
)
export default ScoreBoard 