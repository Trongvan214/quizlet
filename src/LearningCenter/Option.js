import React, { Component } from 'react'
import { ButtonToolbar, ToggleButton, ToggleButtonGroup, Button } from 'react-bootstrap';
export default class Option extends Component {
    state = {
        studyType:  0,
        answerWith: 1,
    }
    handleOptionChange = (e,option) => {
        this.setState({
            [option]: e,
        })
    }
    handleSubmit = () => {
        this.props.getOption(this.state);
    }
    render(){
        return (
            <div>
                <p>Study Type</p>
                <ButtonToolbar>
                    <ToggleButtonGroup type="radio" name="studyType" value={this.state.studyType} 
                            onChange={(e)=>this.handleOptionChange(e,"studyType")}>
                        <ToggleButton value={0}>All</ToggleButton>
                        <ToggleButton value={1}>Starred</ToggleButton>
                    </ToggleButtonGroup>
                </ButtonToolbar>

                <p>Answer With</p>
                <ButtonToolbar>
                    <ToggleButtonGroup type="radio" name="answerWith" value={this.state.answerWith}
                        onChange={(e)=>this.handleOptionChange(e,"answerWith")}>
                        <ToggleButton value={0}>Term</ToggleButton>
                        <ToggleButton value={1}>Definition</ToggleButton>
                        {this.props.flashCards ? <ToggleButton value={2}>Both</ToggleButton> : null}
                    </ToggleButtonGroup>
                </ButtonToolbar>
                <Button type="submit" bsStyle="danger" onClick={this.handleSubmit}>Start Over</Button>
            </div>
        )
    }
}