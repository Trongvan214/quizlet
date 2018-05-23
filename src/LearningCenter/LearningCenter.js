import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ShowCards from './ShowCards/js/ShowCards';

export default class LearningCenter extends Component {
    state = { 
        title: '',
        cards: [],
    }
    componentDidMount(){
        let title = this.props.match.params.qname;
        if(JSON.parse(localStorage.getItem(title)) === null){
            return;
        }
        let cards = JSON.parse(localStorage.getItem(title));
        this.setState({title,cards});
    }
    updateCards = (cards) => {
        this.setState({cards});
        localStorage.setItem(this.state.title, JSON.stringify(cards));
    }
    render(){
        const { title } = this.state;
        const learningChoices = ["LEARN", "FLASHCARDS", "WRITE"];
        return (
            <div>
                {learningChoices.map(choice => (
                    <div key={choice}>
                        <Link to={title+"/"+choice.toLowerCase()}>{choice}</Link>
                    </div>
                ))}
                <ShowCards cards={this.state.cards} update={this.updateCards}/>
            </div>
        )
    }
}