import React, {Component} from 'react';

export default class ExistingQuizlet extends Component {
    state = {
        quizlets: [],
        editMode: false,
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
    edit = () => {
        this.setState({editMode: !this.state.editMode});
    }
    delete = (e,title) => {
        e.stopPropagation();
        localStorage.removeItem(title);
        let quizlets = this.state.quizlets.slice();
        quizlets = quizlets.filter(card => card !== title);
        this.setState({quizlets});
    }
    render(){
        return (
            <div>
                <h1>List of quizlets</h1>
                { this.state.quizlets.length ? <p onClick={this.edit}>edit</p> : null }
                {
                    this.state.quizlets.map((title,i) => {
                        let _title = title;
                        let cards = JSON.parse(localStorage.getItem(title));
                        if(cards){
                            let length = cards.length;
                            return (
                                <div className="quizlet-info" onClick={() => this.handleClick(title)} key={i}>
                                    <span className="quizlet-info-title">{_title}</span>{" "}
                                    <span className="quizlet-info-length">{length+" terms"}</span>
                                    {this.state.editMode ? <p onClick={(e)=>this.delete(e,title)}>X</p> : null} 
                                </div>
                            )
                        }
                        return null
                    })
                }
            </div>
        )
    }
}