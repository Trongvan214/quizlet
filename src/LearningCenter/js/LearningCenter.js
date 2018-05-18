import React, { Component } from 'react';

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
    render(){
        return (
            <div>
                <h1>{this.state.title}</h1>
                {
                    this.state.cards.map((card,i) => (
                        <React.Fragment key={i}>
                            <p>Term Name: {card.term}</p>
                            <p>Description Name: {card.definition}</p>
                        </React.Fragment>
                    ))
                }
            </div>
        )
    }
}