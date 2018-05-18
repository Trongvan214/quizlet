import React, { Component } from 'react';
import {FormControl, FormGroup, ControlLabel} from 'react-bootstrap';
import '../css/NewCard.css';

export default class NewCard extends Component {
    onChange = (e,type) => {
        this.props.onChange(e.target.value, type, this.props.index);
    }
    render(){
        return (
            <div className="card-form">
                <FormGroup controlId="term">
                    <ControlLabel>Term</ControlLabel>{' '}
                    <FormControl type="text" onChange={(e) => this.onChange(e,"term")}/>
                </FormGroup>{' '}
                <FormGroup controlId="definition">
                    <ControlLabel>Definition</ControlLabel>{' '}
                    <FormControl type="text" onChange={(e) => this.onChange(e,"definition")}/>
                </FormGroup>
            </div>
        )
    }
}