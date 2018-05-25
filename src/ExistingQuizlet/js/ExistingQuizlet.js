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
        let target = '/qname/'.concat(title);
        this.props.history.push(target);
    }
    render(){
        return (
            <div>
                <h1>List of quizlets</h1>
                {
                    this.state.quizlets.map((title,i) => {
                        let _title = title;
                        let length = JSON.parse(localStorage.getItem(title)).length;
                        return (
                            <div className="quizlet-info" onClick={() => this.handleClick(title)} key={i}>
                                <span className="quizlet-info-title">{_title}</span>{" "}
                                <span className="quizlet-info-length">{length+" terms"}</span>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}