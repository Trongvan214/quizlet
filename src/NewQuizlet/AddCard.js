import React, {Component} from 'react';

export default class AddCard extends Component {
    onSubmit = (event) => {
        event.preventDefault();
        //check if user put info for both boxes
        if(this.name.value && this.description.value){
            let cards = this.props.cards;
            //take off the first element that have the title and description (not a card)
            cards.shift();
            let bool = cards.filter(v => v.name === this.name.value).length;
            //do something if this is not a dulicate
            if(!bool){
                this.props.getCard(this.name.value, this.description.value);
            }
        }
        event.target.reset();
    }
    render(){
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <label htmlFor="quizlet-card-name">Term:</label>
                    <input type="text" ref={name => this.name = name} id="card-title-name" />
                    <label htmlFor="quizlet-card-definition">Description:</label>
                    <input type="text" ref={description => this.description = description} id="quizlet-card-description" />
                    <button type="submit">Add</button>
                </form> 
            </div>
        )
    }
}