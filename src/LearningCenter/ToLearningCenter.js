import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ToLearningCenter extends Component {
    render(){
        let style = {
            "display": "block",
            "textAlign": "center",
        }
        return (
            <div style={style}>
                 <Link to={`/qname/${this.props.qname}`}>LearningCenter</Link>
            </div>
        )
    }
}