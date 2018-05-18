import React, {Component} from 'react';

export default class ExistingQuizlet extends Component {
    state = {
        quizlets: [],
    }
    componentDidMount(){
        let quizlets = [];
        for (var i = 0; i < localStorage.length; i++){
            quizlets.push(localStorage.key(i));
        }
        this.setState({quizlets});
    }
    handleClick = (title) => {
        let target = '/learn/'.concat(title);
        this.props.history.push(target);
    }
    render(){
        return (
            <div>
                <h1>List of quizlets</h1>
                {
                    this.state.quizlets.map((title,i) => {
                        return <p key={i} onClick={()=>this.handleClick(title)}>{title}</p>
                    })
                }
            </div>
        )
    }
}
