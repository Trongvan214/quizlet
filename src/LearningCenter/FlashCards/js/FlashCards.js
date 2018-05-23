import React, { Component } from 'react';
import { Pager, Button } from 'react-bootstrap';
import Option from '../../Option';
import ToLearningCenter from '../../ToLearningCenter';
import ToggleCard from './ToggleCard';

export default class FlashCardsQuiz extends Component {
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
    changeCard = (which) => {
        let { currentCardIndex, cards } = this.state;
        if(which === "next")
            currentCardIndex++;
        else 
            currentCardIndex--;

        let length = cards.length;
        if(currentCardIndex > length-1 || currentCardIndex < 0){
            let cards = this.state.cards.slice();
            cards = shuffle(cards);
            if(which === "next") 
                currentCardIndex = 0;
            else 
                currentCardIndex = length-1;
            this.setState({cards, currentCardIndex});
            return;
        }
        this.setState({ currentCardIndex });
    }
    shuffle = () => {
        let currentCardIndex = getRandomInt(0, this.state.cards.length - 1);
        this.setState({currentCardIndex});
        
    }
    updateOption = (value,option) => {
        this.setState({option: {
            ...this.state.option,
            [option]: value,
        }});
    }
    render(){
        if(this.state.shouldStop) return <h1>Trong is the best</h1>;
        return (
            <div>
                <ToLearningCenter qname={this.state.title} />
                <Option 
                    option={this.state.option} 
                    getOption={this.updateOption} 
                    cards={this.state.cards} 
                    flashCard
                />
                <Button type="button" onClick={this.shuffle} bsStyle="danger">Shuffle</Button>
                <ToggleCard 
                    card={this.state.currentCard} 
                    answerWith={this.state.option.answerWith} 
                    both={this.state.option.answerWith === 2 ? true : false}
                />
                <Pager>
                    <Pager.Item onClick={()=>this.changeCard("prev")}>Previous</Pager.Item>
                    <Pager.Item onClick={()=>this.changeCard("next")}>Next</Pager.Item>
                </Pager>
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