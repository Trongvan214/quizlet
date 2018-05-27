import React, { Component } from 'react';
import {  Row, Col, Button } from 'react-bootstrap';
import '../css/ShowCards.css';

export default class ShowCards extends Component {
    constructor(props){
        super(props);
        this.state = {
            cards: [],
        }
    }
    starred = (index) => {
        let cards = this.props.cards;
        cards[index].starred = !cards[index].starred;
        this.props.update(cards);
    }   
    componentDidUpdate(prevProps){
        //do it in there for starred or apl
        let differentProps = JSON.stringify(prevProps) !== JSON.stringify(this.props);
        if(differentProps){
            let cards = this.props.cards;
            this.setState({cards});
        }
    }
    edit = () => {
        let newPath = this.props.pathname+"/edit";
        this.props.history.push(newPath);
    }
    render(){
        return (
            <React.Fragment>
                <Row className="showcard-title">
                    <Col md={3} sm={3}>
                        <p>Term</p>
                    </Col>
                    <Col md={6} sm={5}>
                        <p>Definition</p>
                    </Col>
                </Row>
                {this.state.cards.map((card, index) => (
                    <Row className="showcard-info" key={index}>
                        <Col md={3} sm={3}>
                            <p>{card.term}</p>
                        </Col>
                        <Col md={6} sm={5}>
                            <p>{card.definition}</p>
                        </Col>
                        <Col md={3} sm={4}>
                            {
                                card.starred ? <span className="showcard-star" onClick={()=>this.starred(index)}>&#9733;</span>
                                : <span className="showcard-star" onClick={()=>this.starred(index)}>&#9734;</span>
                            }
                            <span className="showcard-pen" >&#128393;</span>
                        </Col>
                    </Row>
                ))}
                <Row>
                    <button  
                        className="showcard-add" 
                        type="button" 
                        onClick={this.edit}
                    >
                        + Add or Remove Terms
                    </button>
                </Row>
            </React.Fragment>
        )
    }
}