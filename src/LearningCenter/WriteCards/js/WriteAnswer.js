import React, { Component } from 'react';
import { FormGroup, FormControl, Button } from 'react-bootstrap';

export default class WriteAnswer extends Component {
    state = {
        userAnswer: '',
        question: '',
        answer: '',
        showAnswer: false,
        AbandonQuestion: false,
    }
    componentDidUpdate(prevProps, prevState){
        let differentProps = JSON.stringify(prevProps) !== JSON.stringify(this.props);
        if(differentProps){
            const { card, answerWith } = this.props;
            let questionWith = answerWith ? 0 : 1;
            let answerProperty = Object.keys(card)[answerWith];      // "term" or "definition"
            let questionProperty = Object.keys(card)[questionWith]; // "term" or "definition"
            let answer = card[answerProperty];
            let question = card[questionProperty];
            this.setState({ answer, question });
        }
    }
    handleChange = (e) => {
        let userAnswer = e.target.value;
        this.setState({ userAnswer });
    }
    handleAnswer = () => {
        this.setState({showAnswer: true});
    }
    dontKnow = () => {
        this.setState({showAnswer: true, AbandonQuestion: true});
    }
    nextQuestion = (isCorrect) => {
        if(this.state.abandonQuestion){
            this.props.nextQuestion(false);
            this.setState({showAnswer: false, abandonQuestion: false});
            return;
        }
        this.setState({showAnswer: false});
        this.props.nextQuestion(isCorrect);
    }
    render(){
        if(this.state.showAnswer){
            return <AnswerScreen    answer={this.state.answer}
                                    question={this.state.question}
                                    userAnswer={this.state.userAnswer}
                                    nextQuestion={this.nextQuestion}
                                    abandonQuestion={this.state.AbandonQuestion}
                                    />   
        }
        return (
            <div>
                <p>Question</p>
                <p>{this.state.question}</p>
                <FormGroup>
                    <FormControl 
                        type="text"
                        onChange={this.handleChange}
                        value={this.props.value}
                    />
                </FormGroup>
                <Button type="submit" bsStyle="danger" onClick={this.handleAnswer}>Answer</Button>
                <Button type="submit" bsStyle="warning" onClick={this.dontKnow}>Don't Know</Button>
                {this.state.message}
            </div>
        )
    }
}

class AnswerScreen extends Component {
    overrideAnswer = () => {
        this.props.nextQuestion(true);
    }
    render(){
        const { userAnswer, question, answer, nextQuestion, abandonQuestion } = this.props;
        let isCorrect = userAnswer.toLowerCase() === answer.toLowerCase();
        return (
            <div>
                <h1>{ isCorrect ? "Correct! Good job" : "Incorrect! Study this one!"}</h1>
                <div>
                    <p>PROMPT</p>
                    <p>{question}</p>
                </div>
                <div>
                    <p>CORRECT ANSWER</p>
                    <p>{answer}</p>
                </div>
                { 
                    !isCorrect && !abandonQuestion ? 
                    <React.Fragment>
                        <p>YOU PICKED</p>
                        <p>{ !userAnswer ? "Nothing" : userAnswer }</p>
                    </React.Fragment>
                    : 
                    null
                }
                {
                    abandonQuestion ? 
                    null
                    :
                    <Button type="button" bsStyle="danger" onClick={this.overrideAnswer}>Override: I was right</Button>
                }
                <Button type="button" bsStyle="danger" onClick={()=>nextQuestion(isCorrect)}>Next Question</Button>
            </div>
        )
    }
}