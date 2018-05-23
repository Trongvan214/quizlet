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
        currentCard: {},
        currentChoiceCards: [],      
        totalChoicesCount: 2,   //number of multiple choice
        option: {       
            studyType:  0,      //0 for study all cards, 1 for study starred cards
            answerWith: 1,      //0 for answer with term, 1 for defintion
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
        cards = shuffle(cards);
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
        if(currentQuestionIndex > this.state.cards.length - 1){
            let cards = this.state.cards.slice();
            cards = shuffle(cards);
            currentQuestionIndex = 0;
            this.setState({cards, currentQuestionIndex});
            // this.setState({shouldStop: true});
            return;
        }
        this.setState({currentQuestionIndex});
    }
    shuffle = () => {
        let currentQuestionIndex = getRandomInt(0, this.state.cards.length - 1);
        this.setState({currentQuestionIndex});
    }
    updateOption = (obj) => {
        this.setState({option: obj});
    }
    stop = () => {
        this.setState({shouldStop: true});
    }
    componentDidUpdate(prevProps, prevState){
        //scenario to update state 
        let differentCurrentQuestionIndex = this.state.currentQuestionIndex !== prevState.currentQuestionIndex;
        let differentOption = JSON.stringify(this.state.option) !== JSON.stringify(prevState.option);
        if(differentCurrentQuestionIndex){
            let { answerWith } = this.state.option;
            let { cards, currentQuestionIndex, totalChoicesCount } = this.state;
            let currentCard = cards[currentQuestionIndex];
            let currentChoiceCards = multipleChoices(cards, currentCard, totalChoicesCount, answerWith);
            this.setState({cards, currentCard, currentChoiceCards});
        }
        else if(differentOption){
            let { answerWith, studyType } = this.state.option;
            let { cards, currentQuestionIndex, totalChoicesCount } = this.state;
            if(studyType){
                //filter and get cards that's starred
                cards = cards.filter(card => card.starred);
                console.log('study', cards);
            }
            //reset the index to 0 
            currentQuestionIndex = 0;
                        
            let currentCard = cards[currentQuestionIndex]; 
            let currentChoiceCards = multipleChoices(cards, currentCard, totalChoicesCount, answerWith);
            this.setState({cards, currentQuestionIndex, currentCard, currentChoiceCards});
        }
    }
    render(){
        if(this.state.shouldStop) return <ProgressScreen progress={this.state.progress}/>
        return (
            <div>
                <Option getOption={this.updateOption} cards={this.state.cards}/>
                <Button type="button" bsStyle="danger" onClick={this.shuffle}>Shuffle</Button>
                <MultipleChoice 
                    choices={this.state.currentChoiceCards}
                    card={this.state.currentCard}
                    answerWith={this.state.option.answerWith}
                    nextQuestion={this.nextQuestion}
                />
                <ScoreBoard scores={this.state.scores} />
                <Button type="button" bsStyle="danger" onClick={this.stop}>End</Button>
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