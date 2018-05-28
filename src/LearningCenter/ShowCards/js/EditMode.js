import React, { Component } from 'react';
import { Row, Col, FormControl } from 'react-bootstrap';

export default class EditMode extends Component { 
    starred = (index) => {
        this.props.starred(index);
    }
    submitCard = () => {
        this.props.update(this.props.index, this.term, this.defintion);
    }
    render(){ 
        const { card, index } = this.props;
        return (
            <Row className="showcard-info">
                <Col md={3} sm={3}>
                    <FormControl type="text" defaultValue={card.term} inputRef={ref => this.term = ref }/>
                </Col>
                <Col md={6} sm={5}>
                    <FormControl type="text" defaultValue={card.definition} inputRef={ref => this.definition = ref}/>
                </Col>
                <Col md={3} sm={4}>
                    {
                        card.starred ? <span className="showcard-star" onClick={()=>this.starred(index)}>&#9733;</span>
                        : <span className="showcard-star" onClick={()=>this.starred(index)}>&#9734;</span>
                    }
                    <span onClick={this.submitCard} className="showcard-pen">&#128393;</span>
                </Col>
            </Row>
        )
    }
}