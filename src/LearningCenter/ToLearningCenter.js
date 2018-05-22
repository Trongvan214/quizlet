import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ToLearningCenter extends Component {
    toLearningCenter = () => {
        this.props.history.replace(this.props.location.pathname);
    }
    render(){
        let style = {
            "display": "block",
            "textAlign": "center",
        }
        let  qname = this.props.match.params.qname;
        return (
            <div style={style}>
                 <Link to={`/quizlet/${qname}`}>LearningCenter</Link>
            </div>
        )
    }
}