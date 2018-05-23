import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

export default class MultipleChoice extends Component {
    constructor(props,context){
        super(props,context);
        this.state = {
            showAnswer: false,
            userChoice: '',
        }
    }
    pickChoice = (choice) => {
        this.setState({
            showAnswer: true,
            userChoice: choice,
        })
    }
    nextQuestion = (isCorrect) => {
        this.setState({
            showAnswer: false,
        })
        this.props.nextQuestion(isCorrect);
    }
    render(){
        const { card, choices, answerWith} = this.props;
        let questionWith = answerWith ? 0 : 1;
        let answerProperty = Object.keys(card)[answerWith];      // "term" or "definition"
        let questionProperty = Object.keys(card)[questionWith]; // "term" or "definition"
        if(this.state.showAnswer) 
            return <AnswerScreen 
                        userChoice={this.state.userChoice}
                        question={card[questionWith]}
                        answer={card[answerWith]}
                        nextQuestion={this.nextQuestion}
                        answerWithProperty={answerProperty}
                    />
        return (
                <div className="question-wrapper">
                    <h1>{card[questionProperty]}</h1>
                    {choices.map(choice => (
                        <div key={choice[answerProperty]} 
                            onClick={()=>this.pickChoice(choice)}>{choice[answerProperty]}</div>
                    ))}
                </div>
        )
    }
}

class AnswerScreen extends Component {
    render(){
        const { userChoice, question, answer, nextQuestion, answerWithProperty} = this.props;
        let isCorrect = userChoice[answerWithProperty] === answer;
        return (
            <div>
                <h1>{ isCorrect ? "Correct! Good job" : "Study this one!"}</h1>
                <div className="answer-screen-wrapper">
                    <p>TERM</p>
                    <p>{question}</p>
                </div>
                <div className="answer-screen-wrapper">
                    <p>CORRECT ANSWER</p>
                    <p>{answer}</p>
                </div>
                { !isCorrect ? 
                    <React.Fragment>
                        <p>YOU PICKED</p>
                        <p>{userChoice[answerWithProperty]}</p>
                        <p>GOES WITH</p>
                        <p>{answerWithProperty === "term" ? userChoice.definition : userChoice.term}</p>  
                    </React.Fragment> 
                    :
                    null        
                }
                <Button type="button" bsStyle="danger" onClick={()=>nextQuestion(isCorrect)}>Next Question</Button>
            </div>
        )
    }
}