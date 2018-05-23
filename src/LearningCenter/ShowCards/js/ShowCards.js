import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import '../css/ShowCards.css';

export default class ShowCards extends Component {
    starred = (index) => {
        let cards = this.props.cards;
        cards[index].starred = !cards[index].starred;
        this.props.update(cards);
    }   
    render(){
        const { cards } = this.props;
        return (
            <Grid>
                {cards.map((card, index) => (
                    <Row className="showcard-info" key={index}>
                        <Col md={3} sm={3}>
                            <p>{card.term}</p>
                        </Col>
                        <Col md={6} sm={5}>
                            <p>{card.definition}</p>
                        </Col>
                        <Col md={3} sm={4}>
                            {
                                card.starred ? <span onClick={()=>this.starred(index)}>&#9733;</span>
                                : <span onClick={()=>this.starred(index)}>&#9734;</span>
                            }
                            <span>&#128393;</span>
                        </Col>
                    </Row>
                ))}
            </Grid>
        )
    }
}