import React, { Component } from 'react';
import ToLearningCenter from '../../ToLearningCenter';
import { Button } from 'react-bootstrap';
import Option from '../../Option';
import ScoreBoard from '../../ScoreBoard';
import WriteAnswer from './WriteAnswer';
import ProgressScreen from '../../ProgressScreen/js/ProgressScreen';

export default class WriteQuiz extends Component {
    state = { 
        title: '',
        cards: [],
        copyCards: [],
        currentCardIndex: -1,
        currentCard: {},
        option: {       
            studyType:  0,      //0 for study all cards, 1 for study starred cards
            answerWith: 1,      //0 for answer with term, 1 for defintion, 2 to show both 
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
        let currentCardIndex = 0;
        this.setState({ title, cards, currentCardIndex, copyCards });
    }
    shuffle = () => {
        let currentCardIndex = getRandomInt(0, this.state.cards.length);
        this.setState({currentCardIndex});
        
    }
    updateOption = (value,option) => {
        this.setState({option: {
            ...this.state.option,
            [option]: value,
        }});
    }
    nextQuestion = (isCorrect) => {
        let { currentCardIndex } = this.state;
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
        currentCardIndex++;
        if(currentCardIndex > this.state.cards.length - 1){
            let cards = this.state.cards.slice();
            cards = shuffle(cards);
            currentCardIndex = 0;
            this.setState({cards, currentCardIndex});
            return;
        }
        this.setState({currentCardIndex});
    }
    componentDidUpdate(prevProps, prevState){
        //scenario to update state 
        let differentCardIndex = this.state.currentCardIndex !== prevState.currentCardIndex;
        let differentOption = JSON.stringify(this.state.option) !== JSON.stringify(prevState.option);
        if(differentCardIndex){
            let { cards, currentCardIndex } = this.state;
            let currentCard = cards[currentCardIndex];
            this.setState({ currentCard });
        }
        if(differentOption){
            let { studyType } = this.state.option;
            let { currentCardIndex } = this.state;
            let cards = this.state.cards.slice();
            let copyCards = this.state.cards.slice();
            let differentType = this.state.option.studyType !== prevState.option.studyType; 
            if(differentType){
                if(studyType){
                    //filter and get cards that's starred
                    cards = cards.filter(card => card.starred);
                }
                else {
                    cards = shuffle(copyCards);
                }
            }
            //reset the index to 0 
            currentCardIndex = 0;
                        
            let currentCard = cards[currentCardIndex]; 
            this.setState({cards, currentCardIndex, currentCard });
        }
    }
    stop = () => {
        this.setState({shouldStop: true});
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
                <WriteAnswer 
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