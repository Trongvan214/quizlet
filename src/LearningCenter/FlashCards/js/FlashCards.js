import React, { Component } from 'react';
import { Pager, Button } from 'react-bootstrap';
import Option from '../../Option';

export default class FlashCardsQuiz extends Component {
    state = { 
        title: '',
        cards: [],
        currentCardIndex: 0,
        currentCard: {},
        option: {       
            studyType:  0,      //0 for study all cards, 1 for study starred cards
            answerWith: 1,      //0 for answer with term, 1 for defintion, 2 to show both 
            questionWith: 0,
        },
        shouldStop: false,
    }
    componentWillMount(){
        let title = this.props.match.params.qname;
        if(JSON.parse(localStorage.getItem(title)) === null){
            //impossible case, but just incase user clear localStorage
            return;
        }
        let cards = JSON.parse(localStorage.getItem(title));
        let currentCard = cards[this.state.currentCardIndex];
        this.setState({title, cards, currentCard});
    }
    nextCard = () => {
        let { currentCardIndex, cards } = this.state;
        currentCardIndex++;
        if(currentCardIndex > cards.length-1){
            this.setState({shouldStop: true});
        }
        let currentCard = cards[currentCardIndex];
        this.setState({ currentCard, currentCardIndex });
    }
    shuffle = () => {
        let cards = shuffle(this.state.cards);
        let currentCard = cards[this.state.currentCardIndex];
        this.setState({cards,currentCard});
        
    }
    updateOption = (obj) => {
        this.setState({option: {...this.state.option, ...obj}});
    }
    render(){
        const { currentCard } = this.state;
        if(this.state.shouldStop) return <h1>Trong is the best</h1>;
        return (
            <div>
                <Option getOption={this.updateOption} />
                <Button type="button" onClick={this.shuffle} bsStyle="danger">Shuffle</Button>
                <ToggleCard term={currentCard.term} definition={currentCard.definition} />
                <Pager>
                    <Pager.Item onClick={this.nextCard}>Previous</Pager.Item>
                    <Pager.Item onClick={this.nextCard}>Next</Pager.Item>
                </Pager>
            </div>
        )
    }
}

class ToggleCard extends Component {
    state = {
        toggle: true,
    }
    toggle = () => {
        this.setState({toggle: !this.state.toggle})
    }
    render(){
        if(this.state.toggle){
            return (
                <div onClick={this.toggle}>
                    <p>Term</p>
                    <p>{this.props.term}</p>
                </div>
            )
        }
        return (
            <div onClick={this.toggle}>
            <p>Definition</p>
            <p>{this.props.definition}</p>
        </div>
        )
    }
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