import React, { Component } from 'react';

export default class MultipleChoice extends Component {
    constructor(props,context){
        super(props,context);
        this.state = {
            showAnswer: false,
            isCorrect: null,
            userChoice: '',
        }
    }
    pickChoice = (choice) => {
        this.setState({
            showAnswer: true,
            isCorrect: choice === this.props.answer,
            userChoice: choice,
        })
    }
    nextQuestion = () => {
        this.setState({
            showAnswer: false,
        })
        this.props.nextQuestion();
    }
    render(){
        const { question, choices } = this.props;
        if(this.state.showAnswer) 
            return <AnswerScreen 
                        isCorrect={this.state.isCorrect} 
                        userChoice={this.state.userChoice}
                        nextQuestion={this.nextQuestion}
                    />
        return (
                <div className="question-wrapper">
                    <h1>{question}</h1>
                    {choices.map(choice => (
                        <div key={choice} onClick={()=>this.pickChoice(choice)}>{choice}</div>
                    ))}
                </div>
        )
    }
}

class AnswerScreen extends Component {
    render(){
        return (
            <div>
                <p>You have answer it {this.props.isCorrect ? "right" : "wrong"}</p>
                <p>You picked {this.props.userChoice}</p>
                <div onClick={this.props.nextQuestion}>Next Question</div>
            </div>
        )
    }
}