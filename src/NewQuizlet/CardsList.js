import React, {Component} from 'react';

export default class CardsList extends Component {
    edit = () => {

    }
    delete = (name) => {
        this.props.deleteCard(name);
    }
    render(){
        let cards = this.props.cards.map((v,i) => {
            if(i > 0){
                return (
                    <div className="card" key={i}>
                        <span>{v.name}</span>
                        <span>|</span>
                        <span>{v.description}</span>
                        <button onClick={this.edit}>Edit</button>
                        <button onClick={this.delete}>Delete</button>
                    </div>
                )
            }
            return null;
        })
        return cards;
    }
}