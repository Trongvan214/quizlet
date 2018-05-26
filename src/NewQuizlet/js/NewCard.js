import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import '../css/NewCard.css';

export default class NewCard extends Component {
    onChange = (e,type) => {
        this.props.onChange(e.target.value, type, this.props.index);
    }
    delete = () => {
        this.props.delete(this.props.index);
    }
    render(){
        const { editMode, index } = this.props;
        return (
            <Row className="newcard-form">
                <Col md={1} className="newcard-index">
                    {
                        editMode ? <span onClick={this.delete} className="glyphicon glyphicon-trash"></span> : <span>{index+1}</span>
                    }
                </Col>
                <Col md={5} className="newcard-col">
                    <div className="newcard-box">
                        <input type="text" id="newcard-term" onChange={(e) => this.onChange(e,"term")} value={this.props.term}/>
                        <label htmlFor="newcard-term">Term</label>
                    </div>
                </Col>
                <Col md={5} mdOffset={1} className="newcard-col">
                    <div className="newcard-box">
                        <input type="text" id="newcard-defintion" onChange={(e) => this.onChange(e,"definition")} value={this.props.definition}/>
                        <label htmlFor="newcard-definition">Definition</label>
                    </div>
                </Col>
            </Row>
        )
    }
}