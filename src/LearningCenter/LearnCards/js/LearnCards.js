import React, { Component } from 'react';
import MultipleChoice from './MultipleChoice';
import ProgressScreen from '../../ProgressScreen/js/ProgressScreen';

export default class LearnCards extends Component {
    state = { 
        title: '',
        cards: [],
        currentQuestionIndex: 0,
        currentQuestion: "",
        currentChoiceCards: [],
        currentCorrectAnswer: "",       
        totalChoicesCount: 2,   //number of multiple choice
        option: {
            shuffle: false,
            study: "all",       //pick all cards or starred card
            answerWith: 1,      //0 = terms, 1 = definition
            questionWith: 0,
        },
        progress: {},           //the result
        shouldStop: false,
    }
    componentDidMount(){
        let title = this.props.match.params.qname;
        if(JSON.parse(localStorage.getItem(title)) === null){
            //impossible case, but just incase user clear localStorage
            return;
        }
        let cards = JSON.parse(localStorage.getItem(title));
        let { answerWith, questionWith } = this.state.option;
        let currentCard = cards[this.state.currentQuestionIndex];
        let q = Object.keys(currentCard)[questionWith];
        let a = Object.keys(currentCard)[answerWith];   
        let currentQuestion = currentCard[q];
        let currentCorrectAnswer = currentCard[a];   
        let totalChoicesCount = cards.length < 4 ? cards.length : 4;
        let currentChoiceCards = multipleChoices(cards, currentCard, totalChoicesCount, answerWith);
        this.setState({title, cards, currentQuestion, currentCorrectAnswer, currentChoiceCards, totalChoicesCount});
    }
    nextQuestion = () => {
        let { cards, currentQuestionIndex,  totalChoicesCount} = this.state;
        let { questionWith, answerWith } = this.state.option;

        currentQuestionIndex++;
        //if out of question stop
        if(currentQuestionIndex > cards.length-1){
            this.setState({shouldStop: true});
        }
        else {
            let currentCard = this.state.cards[currentQuestionIndex];
            let q = Object.keys(currentCard)[questionWith];
            let a = Object.keys(currentCard)[answerWith];   
            let currentQuestion = currentCard[q];
            let currentCorrectAnswer = currentCard[a];   
            let currentChoiceCards = multipleChoices(cards, currentCard, totalChoicesCount, answerWith);
            this.setState({currentQuestionIndex, currentQuestion, currentCorrectAnswer, currentChoiceCards});
        }
    }
    render(){
        let templateCard = {"term": "", "definition": ""};
        let answerWithProperty = Object.keys(templateCard)[this.state.option.answerWith];
        if(this.state.shouldStop) return <ProgressScreen progress={this.state.progress}/>
        return (
            <div>
                <MultipleChoice 
                    question={this.state.currentQuestion}
                    choices={this.state.currentChoiceCards}
                    answer={this.state.currentCorrectAnswer}
                    nextQuestion={this.nextQuestion}
                    answerWithProperty={answerWithProperty}
                />
            </div>
        )
    }
}

//helper functions

//return an array cards with 1 right answer card inside all mix up 
const multipleChoices = (ansArr, correctAnswerCard, howManyChoices, answerWith) => {

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
// const shuffle = (a) => {
//     var j, x, i;
//     for (i = a.length - 1; i > 0; i--) {
//         j = Math.floor(Math.random() * (i + 1));
//         x = a[i];
//         a[i] = a[j];
//         a[j] = x;
//     }
//     return a;
// }