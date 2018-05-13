import React, {Component} from 'react';
import GetTitle from './GetTitle';
import AddCard from './AddCard';
import CardsList from './CardsList';

export default class NewQuizlet extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: "",
            description: "",
            cards: [],
            addMode: false,
        }
        this.getTitle = this.getTitle.bind(this);
        this.getCard = this.getCard.bind(this);
    }
    getTitle = (title, description) => {
        let cards;
        if(localStorage.getItem(title) === null || localStorage.getItem(title) === "null"){
            cards = [];
            cards.push({title, description});
        }
        localStorage.setItem(title, JSON.stringify(cards));
        this.setState({
            title: title, 
            description: description,
            addMode: true,
        });
    }
    getCard = (name,description) => {
        let title = this.state.title;
        let cards = JSON.parse(localStorage.getItem(title));
        cards.push({name,description});
        localStorage.setItem(title, JSON.stringify(cards));
        this.setState({
            "cards": cards,
        })
    }
    render(){
        if(this.state.addMode){
            return (
                <React.Fragment>
                    <AddCard getCard={this.getCard} cards={this.state.cards} title={this.state.title}/> 
                    <CardsList cards={this.state.cards} />
                </React.Fragment>
            )
        }   
        return <GetTitle getTitle={this.getTitle} />
    }
}