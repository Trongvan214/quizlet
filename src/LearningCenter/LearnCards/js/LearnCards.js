import React, { Component } from 'react';
import MultipleChoice from './MultipleChoice';

export default class LearnCards extends Component {
    state = { 
        title: '',
        cards: [],
        choicesCollection: [],
        currentQuestionIndex: 0,
        currentQuestion: "",
        currentChoices: [],
        currentCorrectAnswer: "",
        totalChoicesCount: 2,
        option: {
            shuffle: false,
            study: "all",
            answerWith: "definition",
        },
        shouldStop: false,
    }
    componentDidMount(){
        let title = this.props.match.params.qname;
        if(JSON.parse(localStorage.getItem(title)) === null){
            //impossible case, but just incase user clear localStorage2
            return;
        }
        else {
            let cards = JSON.parse(localStorage.getItem(title));
            let { answerWith } = this.state.option;
            let choicesCollection = [];
            cards.forEach(card => {
                choicesCollection.push(card[answerWith]); // exp: term as answer (this array contains all terms);
            });
            let currentCard = cards[this.state.currentQuestionIndex];
            let currentQuestion, currentCorrectAnswer;
            if(answerWith === "definition"){
                currentQuestion = currentCard.term;
                currentCorrectAnswer = currentCard.definition;
            }
            else {
                currentQuestion = currentCard.definition;
                currentCorrectAnswer = currentCard.term;   
            }
            let totalChoicesCount = cards.length < 4 ? cards.length : 4;
            let currentChoices = multipleChoices(choicesCollection, currentCorrectAnswer, totalChoicesCount);
            this.setState({title, cards, choicesCollection, currentQuestion, currentCorrectAnswer, currentChoices, totalChoicesCount});
        }
    }
    nextQuestion = () => {
        let { currentQuestionIndex,  
                currentQuestion, 
                currentCorrectAnswer, 
                currentChoices,
                answerWith,
                cards,
                choicesCollection,
                totalChoicesCount
            } = this.state;
        console.log('in next question');
        if(currentQuestionIndex > 0){
            console.log("greater");
        }
        currentQuestionIndex++;
        //if out of question stop
        if(currentQuestionIndex > cards.length){
            this.setState({shouldStop: true})
            return;
        }
        let currentCard = cards[currentQuestionIndex];
        if(answerWith === "definition"){
            currentQuestion = currentCard.term;
            currentCorrectAnswer = currentCard.definition;
        }
        else {
            currentQuestion = currentCard.definition;
            currentCorrectAnswer = currentCard.term;   
        }
        currentChoices = multipleChoices(choicesCollection, currentCorrectAnswer, totalChoicesCount);
        this.setState({currentQuestionIndex, currentQuestion, currentCorrectAnswer, currentChoices});
    }
    render(){
        console.log(this.state);
        if(this.state.shouldStop) return <h1>Trong is awesome</h1>
        return (
            <div>
                <MultipleChoice 
                    question={this.state.currentQuestion}
                    choices={this.state.currentChoices}
                    answer={this.state.currentCorrectAnswer}
                    nextQuestion={this.nextQuestion}
                />
            </div>
        )
    }
}

//helper functions

//return an array with the correct answers and 3 random answer from card set
const multipleChoices = (ansArr, correctAnswer, howManyChoices) => {

    //choices of answer
    let arr = [];

    //filter that answer from the array
    let filterAns = ansArr.filter(v => v !== correctAnswer); 
    let value, random;
    for(let i = 0; i < howManyChoices; i++){
        random = getRandomInt(0,filterAns.length);

        value = filterAns[random];
        arr[i] = value;

        //filter out that value;
        //get rid of the value in the whole array
        // filterAns = filterAns.filter(choice => choice !== value); 
        filterAns.splice(random,1);
    }

    //find random spot for answer
    random = getRandomInt(0,4);

    arr[random] = correctAnswer;

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