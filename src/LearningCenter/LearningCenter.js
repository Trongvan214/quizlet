import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Row } from 'react-bootstrap';
import ShowCards from './ShowCards/js/ShowCards';
import './css/LearningCenter.css';


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
            <Grid className="learningcenter">
                <Row>
                    <div className="learningcenter-back"><Link to="/existingquizlet">Back to Quizlets</Link></div>
                    <ul className="learningcenter-nav">
                        {learningChoices.map(choice => (
                            <li key={choice} className="learningcenter-li">
                                <Link to={title+"/"+choice.toLowerCase()}>{choice}</Link>
                            </li>
                        ))}
                    </ul>
                </Row>
                <ShowCards cards={this.state.cards} update={this.updateCards} history={this.props.history} pathname={this.props.location.pathname}/>
            </Grid>
        )
    }
}