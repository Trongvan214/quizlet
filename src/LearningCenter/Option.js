import React, { Component } from 'react'
import { ButtonToolbar, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
export default class Option extends Component {
    state = {
        disableStarredButton: true,
    }
    componentDidUpdate(prevProps, prevState){
        if(!this.props.cards) return;

        let differentCards = JSON.stringify(this.props.cards) !== JSON.stringify(prevProps.cards);
        if(differentCards){
            let filterCards = this.props.cards.filter(card => card.starred);
            if(filterCards.length){
                this.setState({disableStarredButton: false});
            }
            else {
                this.setState({disableStarredButton: true});
            }

        }
    }
    handleOptionChange = (value,option) => {
        this.props.getOption(value,option);
    }
    render(){
        const { studyType, answerWith } = this.props.option;
        return (
            <div>
                <p>Study Type</p>
                <ButtonToolbar>
                    <ToggleButtonGroup type="radio" name="studyType" value={studyType} 
                            onChange={(e)=>this.handleOptionChange(e,"studyType")}>
                            <ToggleButton value={0} disabled={this.state.disableStarredButton}>All</ToggleButton>
                            <ToggleButton value={1} disabled={this.state.disableStarredButton}>Starred</ToggleButton>
                    </ToggleButtonGroup>
                </ButtonToolbar>

                <p>Answer With</p>
                <ButtonToolbar>
                    <ToggleButtonGroup type="radio" name="answerWith" value={answerWith}
                        onChange={(e)=>this.handleOptionChange(e,"answerWith")}>
                        <ToggleButton value={0}>Term</ToggleButton>
                        <ToggleButton value={1}>Definition</ToggleButton>
                        {this.props.flashCard ? <ToggleButton value={2}>Both</ToggleButton> : null}
                    </ToggleButtonGroup>
                </ButtonToolbar>
            </div>
        )
    }
}