import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import MultipleChoice from './MultipleChoice';
import ProgressScreen from '../../ProgressScreen/js/ProgressScreen';
import ScoreBoard from './ScoreBoard';
import Option from '../../Option';

export default class LearnCards extends Component {
    state = { 
        title: '',
        cards: [],
        currentQuestionIndex: -1,
        currentQuestion: "",
        currentChoiceCards: [],
        currentCorrectAnswer: "",       
        totalChoicesCount: 2,   //number of multiple choice
        option: {       
            studyType:  0,      //0 for study all cards, 1 for study starred cards
            answerWith: 1,      //0 for answer with term, 1 for defintion
            questionWith: 0,
        },
        progress: {
            data: []            //array with all terms correct and incorrect count
        },
        scores: {
            "correct": 0,
            "incorrect": 0,
        },                     
        shouldStop: false,
    }
    componentDidMount(){
        let title = this.props.match.params.qname;
        if(JSON.parse(localStorage.getItem(title)) === null){
            //impossible case, but just incase user clear localStorage
            return;
        }
        let cards = JSON.parse(localStorage.getItem(title));
        let totalChoicesCount = cards.length < 4 ? cards.length : 4;
        let currentQuestionIndex = 0;
        this.setState({title, cards, totalChoicesCount, currentQuestionIndex});
    }
    nextQuestion = (isCorrect) => {
        let { currentQuestionIndex } = this.state;
        //update the progress and score board
        if(isCorrect){
            this.setState({
                scores: Object.assign({},this.state.scores, {correct: this.state.scores.correct+1})
            });
        }   
        else {
            this.setState({
                scores: {
                    ...this.state.scores,
                    incorrect: this.state.scores.incorrect+1
                }
            });
        }
        currentQuestionIndex++;
        if(currentQuestionIndex > this.state.cards - 1){
            this.setState({shouldStop: true});
            return;
        }
        this.setState({currentQuestionIndex});
    }
    shuffle = () => {
        let cards = this.state.cards.slice();
        cards = shuffle(cards);
        this.setState({cards});

    }
    updateOption = (obj) => {
        this.setState({option: {...this.state.option, ...obj}});
    }
    componentDidUpdate(prevProps, prevState){
        //scenario to update state 
        let differentCurrentQuestionIndex = this.state.currentQuestionIndex !== prevState.currentQuestionIndex;
        let differentCards = JSON.stringify(this.state.cards) !== JSON.stringify(prevState.cards);
        let differentOption = JSON.stringify(this.state.option) !== JSON.stringify(prevState.option);

        if(differentCurrentQuestionIndex || differentCards){
            let { questionWith, answerWith } = this.state.option;
            let { cards, currentQuestionIndex, totalChoicesCount } = this.state;
            let currentCard = cards[currentQuestionIndex];
            let q = Object.keys(currentCard)[questionWith];
            let a = Object.keys(currentCard)[answerWith];   
            let currentQuestion = currentCard[q];
            let currentCorrectAnswer = currentCard[a];   
            let currentChoiceCards = multipleChoices(cards, currentCard, totalChoicesCount, answerWith);
            this.setState({cards, currentQuestion, currentCorrectAnswer, currentChoiceCards});
        }
        else if(differentOption){
            let { answerWith, questionWith, studyType } = this.state.option;
            let { cards, currentQuestionIndex, totalChoicesCount } = this.state;
            if(studyType){
                //filter and get cards that's starred
                cards = cards.filter(card => card.starred);
            }
            //reset the index to 0 
            currentQuestionIndex = 0;

            answerWith ? questionWith = 0 : questionWith = 1;
                        
            let currentCard = cards[currentQuestionIndex];
            let q = Object.keys(currentCard)[questionWith];
            let a = Object.keys(currentCard)[answerWith];   
            let currentQuestion = currentCard[q];
            let currentCorrectAnswer = currentCard[a];   
            let currentChoiceCards = multipleChoices(cards, currentCard, totalChoicesCount, answerWith);
            this.setState({option: {...this.state.option, questionWith}, cards, 
                                        currentQuestionIndex, currentQuestion, 
                                        currentCorrectAnswer, currentChoiceCards});
        }
    }
    render(){
        let templateCard = {"term": "", "definition": ""};
        let answerWithProperty = Object.keys(templateCard)[this.state.option.answerWith];
        if(this.state.shouldStop) return <ProgressScreen progress={this.state.progress}/>
        return (
            <div>
                <Option getOption={this.updateOption} learnCards/>
                <Button type="button" bsStyle="danger" onClick={this.shuffle}>Shuffle</Button>
                <MultipleChoice 
                    question={this.state.currentQuestion}
                    choices={this.state.currentChoiceCards}
                    answer={this.state.currentCorrectAnswer}
                    nextQuestion={this.nextQuestion}
                    answerWithProperty={answerWithProperty}
                />
                <ScoreBoard scores={this.state.scores}/>
            </div>
        )
    }
}

//helper functions

//return an array cards with 1 right answer card inside all mix up 
const multipleChoices = (ansArr, correctAnswerCard, howManyChoices, answerWith) => {

    //if 4 cards those are the 4 answer shuffle
    if(ansArr.length === 4) return shuffle(ansArr); 

    //choices of answer
    let arr = [];

    //filter that answer from the array
    let filterArr = ansArr.filter(v => v.term !== correctAnswerCard.term) //the term name is unique

    let value, random;
    for(let i = 0; i < howManyChoices; i++){
        random = getRandomInt(0,filterArr.length);

        value = filterArr[random];
        arr[i] = value;

        //filter out that value;
        //get rid of the value in the whole array
        // filterAns = filterAns.filter(choice => choice !== value); 
        filterArr.splice(random,1);
    }

    //find random spot for answer
    random = getRandomInt(0,4);

    arr[random] = correctAnswerCard;
    return arr;
} 

//generation a value from min to max (not including max)
const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; 
}

//shuffle the array 
const shuffle = (a) => {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}