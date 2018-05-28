import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import '../css/MultipleChoice.css';

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
                        question={card[questionProperty]}
                        answer={card[answerProperty]}
                        nextQuestion={this.nextQuestion}
                        answerWithProperty={answerProperty}
                    />
        return (
                <div className="question-wrapper">
                    <div className="multiplechoice-question">{card[questionProperty]}</div>
                    <ul className="choices-wrapper">
                    {choices.map((choice,index) => (
                        <li key={index} 
                            onClick={()=>this.pickChoice(choice)}>{(index+1)+". "+choice[answerProperty]}
                        </li>
                    ))}
                    </ul>
                </div>
        )
    }
}

class AnswerScreen extends Component {
    render(){
        const { userChoice, question, answer, nextQuestion, answerWithProperty} = this.props;
        let isCorrect = userChoice[answerWithProperty] === answer;
        return (
            <div className="answerscreen">
                <h1>{ isCorrect ? 
                        <span className="answerscreen-green">{"Correct! Good job"}</span>
                        : 
                        <span className="answerscreen-red">{"Incorrect! Study this one!"}</span>}
                </h1>
                <div className="answerscreen-wrapper">
                    <span>TERM</span>
                    <p>{question}</p>
                </div>
                <div className="answerscreen-wrapper">
                    <span className="answerscreen-green">CORRECT ANSWER</span>
                    <p>{answer}</p>
                </div>
                { !isCorrect ? 
                    <React.Fragment>
                        <span className="answerscreen-term">YOU PICKED</span>
                        <p>{userChoice[answerWithProperty]}</p>
                        <span className="answerscreen-term">GOES WITH</span>
                        <p>{answerWithProperty === "term" ? userChoice.definition : userChoice.term}</p>  
                    </React.Fragment> 
                    :
                    null        
                }
                <Button type="button" bsStyle="danger" bsSize="large" onClick={()=>nextQuestion(isCorrect)}>Next Question</Button>
            </div>
        )
    }
}