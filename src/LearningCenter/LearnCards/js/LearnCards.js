import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import ToLearningCenter from '../../ToLearningCenter';
import MultipleChoice from './MultipleChoice';
import ProgressScreen from '../../ProgressScreen/js/ProgressScreen';
import ScoreBoard from './ScoreBoard';
import Option from '../../Option';

export default class LearnCards extends Component {
    state = { 
        title: '',
        cards: [],
        copyCards: [],          //static won't be changing
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
        let copyCards = cards;
        let totalChoicesCount = cards.length < 4 ? cards.length : 4;
        let currentQuestionIndex = 0;
        this.setState({ title, cards, totalChoicesCount, currentQuestionIndex, copyCards });
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
    updateOption = (value,option) => {
        this.setState({option: {
            ...this.state.option,
            [option]: value,
        }});
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
            let copyCards = this.state.copyCards.slice();
            let currentCard = cards[currentQuestionIndex];
            let currentChoiceCards = multipleChoices(copyCards, currentCard, totalChoicesCount, answerWith);
            this.setState({cards, currentCard, currentChoiceCards});
        }
        if(differentOption){
            let { answerWith, studyType } = this.state.option;
            let { currentQuestionIndex, totalChoicesCount } = this.state;
            let copyCards = this.state.copyCards.slice();
            let cards = this.state.cards.slice();
            let differentType = this.state.option.studyType !== prevState.option.studyType; 
            if(differentType){
                if(studyType){
                    //filter and get cards that's starred
                    cards = cards.filter(card => card.starred);
                    //reset the index to 0 
                    currentQuestionIndex = 0;
                }
                else {
                    cards = shuffle(copyCards);
                }
            }
                        
            let currentCard = cards[currentQuestionIndex]; 
            let currentChoiceCards = multipleChoices(copyCards, currentCard, totalChoicesCount, answerWith);
            this.setState({cards, currentQuestionIndex, currentCard, currentChoiceCards });
        }
    }
    render(){
        if(this.state.shouldStop) return <ProgressScreen progress={this.state.progress}/>

        return (
            <div>
                <ToLearningCenter qname={this.state.title} />
                <Option 
                    option={this.state.option} 
                    getOption={this.updateOption} 
                    cards={this.state.cards}
                />
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
const multipleChoices = (cards, correctAnswerCard, howManyChoices, answerWith) => {
    //if 4 cards those are the 4 answer shuffle
    if(cards.length <= 4) return shuffle(cards); 

    //choices of answer
    let arr = [];

    //filter that answer from the array
    let filterArr = cards.filter(v => v.term !== correctAnswerCard.term) //the term name is unique

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