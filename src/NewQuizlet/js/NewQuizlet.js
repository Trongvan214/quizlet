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
            editMode: false,
        }
    }
    componentDidMount(){
        let title = this.props.match.params.qname; 
        console.log(title);
        if(title !== undefined){
            let cards = JSON.parse(localStorage.getItem(title)) 
            if(cards){
                this.setState({editMode: true, cards, title});
            }
            else {
                //put a message saying wrong link
            }
        }
        else {
            //have at least 2;
            let { cards } = this.state;
            cards.push({term: "", definition: "", starred: false}, {term: "", definition: "", starred: false});
            this.setState({cards});
        }
    }
    addMoreCard = () => {
        let cards = this.state.cards.slice();
        cards.push({term: "", definition: "", starred: false});
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
        const { title } = this.state;
        let cards = this.state.cards.slice();
        cards = cards.filter(card => card.term !== "");
        //not fill title
        if(!title){
            this.setState({errorMsg: "YOU NEED A TITLE FOR THIS SET."});
        }
        //not fill first 2 cards
        else if(cards.length < 2){
            this.setState({errorMsg: "YOU NEED PUT DETAISL FOR TWO CARDS."});
        }
        //put in localStorage
        else {
            localStorage.setItem(title, JSON.stringify(cards));
            this.props.history.push('/qname/' + this.state.title);
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
                <Button type="submit" bsStyle="success" onClick={this.handleSubmit}>{this.state.editMode ? "Save" : "Create"}</Button>
                {this.state.errorMsg}
            </form>
        )
    }
}