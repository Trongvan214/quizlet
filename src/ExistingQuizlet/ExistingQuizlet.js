import React, {Component} from 'react';

export default class ExistingQuizlet extends Component {
    state = {
        quizlets: [],
    }
    comopnentWillMount(){
        let quizlets = [];
        for (var i = 0; i < localStorage.length; i++){
            quizlets.push(localStorage.key(i));
        }
    }
    render(){
        let quizlets = this.state.quizlets.map((v,i) => {
            return <div key={i}>{v}</div>
        })
        return quizlets;
    }
}