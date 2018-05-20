import React, {Component} from 'react';
import {FormControl, FormGroup, Button} from 'react-bootstrap';
import NewCard from './NewCard';

export default class NewQuizlet extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: '',
            cards: [],      
            errorMsg: '',  
        }
    }
    componentDidMount(){
        //have at least 2;
        let cards = this.state.cards;
        cards.push({term: "", definition: ""}, {term: "", definition: ""});
        this.setState({cards});
    }
    addMoreCard = () => {
        let cards = this.state.cards.slice();
        cards.push({term: "", definition: ""});
        this.setState({cards});
    }
    onChangeTitle = (e) => {
        this.setState({ title: e.target.value });
    }
    onChangeCard = (value, type, index) => {
        let cards = this.state.cards.slice();
        cards[index][type] = value;
        this.setState({cards});
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const {cards, title} = this.state;
        //not fill title
        if(!title){
            this.setState({errorMsg: "YOU NEED A TITLE FOR THIS SET."});
        }
        //not fill first 2 cards
        else if(!(cards[0].term && cards[1].term)){
            this.setState({errorMsg: "YOU NEED PUT DETAISL FOR TWO CARDS."});
        }
        //put in localStorage
        else {
            localStorage.setItem(title, JSON.stringify(cards));
            this.props.history.push('/quizlet/' + this.state.title);
        }
        
    }
    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <FormGroup controlId="newquizlet" ref={ref => this.value = ref}>
                    <h1>Create a new study set</h1>
                    <FormControl
                        type="text"
                        value={this.state.title}
                        placeholder="Subject, chapter, unit"
                        onChange={this.onChangeTitle}
                    />
                    {this.state.cards.map((card, index) => (
                        <NewCard 
                            key={index}
                            index={index}
                            term={card.term} 
                            definition={card.definition}
                            onChange={this.onChangeCard}
                        />
                    ))}
                    <Button type="button" bsStyle="danger" onClick={this.addMoreCard}>Add card</Button>
                </FormGroup>
                <Button type="submit" bsStyle="success" onClick={this.handleSubmit}>Create</Button>
                {this.state.errorMsg}
            </form>
        )
    }
}