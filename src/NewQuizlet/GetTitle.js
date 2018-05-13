import React, {Component} from 'react';

export default class GetTitle extends Component {
    onSubmit = (event) => {
        event.preventDefault();
        if(this.title.value){
            this.props.getTitle(this.title.value, this.description.value);
        }
        event.target.reset();
    }
    render(){
        return (
            <form onSubmit={this.onSubmit}>
                <label htmlFor="quizlet-title-name">Title:</label>
                <input type="text" ref={title => this.title = title} id="quizlet-title-name" placeholder="Subject, Chapter, Unit" />
                <label htmlFor="quizlet-title-definition">Description:</label>
                <input type="text" ref={description => this.description = description} id="quizlet-title-description" />
                <button type="submit">Create</button>
            </form>
        )
    }
}
