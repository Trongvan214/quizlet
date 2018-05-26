import React, {Component} from 'react';
import { Grid, Button } from 'react-bootstrap';
import NewCard from './NewCard';
import '../css/NewQuizlet.css';

export default class NewQuizlet extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: '',
            cards: [],      
            titleMsg: "Title",
            errorMsgCards: null,  
            editMode: false,
            editUrl: false,
        }
    }
    componentDidMount(){
        let title = this.props.match.params.qname; 
        if(title !== undefined){
            let cards = JSON.parse(localStorage.getItem(title)) 
            if(cards){
                this.setState({editUrl: true, cards, title});
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
            this.setState({errorMsgTitle: "YOU NEED A TITLE FOR THIS SET."});
        }
        //not fill first 2 cards
        if(cards.length < 2){
            this.setState({errorMsg: "YOU NEED PUT DETAISL FOR TWO CARDS."});
        }
        //put in localStorage
        else {
            localStorage.setItem(title, JSON.stringify(cards));
            this.props.history.push('/qname/' + this.state.title);
        }
        
    }
    delete = (index) => {
        let cards = this.state.cards.slice();
        cards.splice(index, 1);
        this.setState({cards});
    }
    edit = () => {
        this.setState({editMode: !this.state.editMode});
    }
    render(){
        return (
            <Grid>
                <form onSubmit={this.handleSubmit} autoComplete="off">
                    <div className="newquizlet-wrapper">
                        <div className="newquizlet-title">
                            <h1>Create a new study set</h1>
                            <input
                                type="text"
                                id="newcard-title"
                                value={this.state.title}
                                placeholder="Subject, chapter, unit"
                                onChange={this.onChangeTitle}
                            />
                            <label htmlFor="newcard-title">Title</label>
                        </div>
                        <div className="newquizlet-buttons">
                            <Button type="button" bsStyle="danger" bsSize="large" onClick={this.edit} className="newquizlet-edit"><span>Edit</span></Button>
                            <Button type="submit" bsStyle="info" bsSize="large" onClick={this.handleSubmit} className="newquizlet-submit">
                                {this.state.editUrl ? "Save" : "Create"}
                            </Button>
                        </div>
                    </div>
                    <div className="newquizlet-error">{this.state.errorMsg}</div>
                    {this.state.cards.map((card, index) => (
                        <NewCard 
                            key={index}
                            index={index}
                            term={card.term} 
                            definition={card.definition}
                            onChange={this.onChangeCard}
                            delete={this.delete} 
                            editMode={this.state.editMode}
                        />
                    ))}
                    <button type="button" className="newquizlet-add" onClick={this.addMoreCard}><span>+ ADD CARD</span></button>
                </form>
            </Grid>
        )
    }
}