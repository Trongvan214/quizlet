import React, { Component } from 'react';
import '../css/ToggleCard.css';

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
                <div className="togglecard">
                    <div className="togglecard-wrapper">
                    <span className="togglecard-term">Question</span>
                        <p>{card.term}</p>
                    </div>
                    <div className="togglecard-wrapper">
                    <span className="togglecard-term">Definition</span>
                        <p>{card.definition}</p>
                    </div>
                </div>
            )
        }
        if(this.state.toggle){
            return (
                <div onClick={this.toggle} className="togglecard">
                    <span className="togglecard-term">Question</span>
                    <p>{card[questionProperty]}</p>
                </div>
            )
        }
        return (
            <div onClick={this.toggle} className="togglecard">
                    <span className="togglecard-term">Definition</span>
                <p>{card[answerProperty]}</p>
            </div>
        )
    }
}