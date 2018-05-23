import React, { Component } from 'react';

export default class ToggleCard extends Component {
    state = {
        toggle: true,
    }
    toggle = () => {
        this.setState({toggle: !this.state.toggle})
    }
    render(){
        const { card, answerWith} = this.props;
        let questionWith = answerWith ? 0 : 1;
        let answerProperty = Object.keys(card)[answerWith];      // "term" or "definition"
        let questionProperty = Object.keys(card)[questionWith]; // "term" or "definition"
        if(this.props.both){
            return (
                <React.Fragment>
                    <div>
                        <p>Question</p>
                        <p>{card.term}</p>
                    </div>
                    <div>
                        <p>Answer</p>
                        <p>{card.definition}</p>
                    </div>
                </React.Fragment>
            )
        }
        if(this.state.toggle){
            return (
                <div onClick={this.toggle}>
                    <p>Question</p>
                    <p>{card[questionProperty]}</p>
                </div>
            )
        }
        return (
            <div onClick={this.toggle}>
                <p>Answer</p>
                <p>{card[answerProperty]}</p>
            </div>
        )
    }
}