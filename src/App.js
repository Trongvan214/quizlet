import React, { Component } from 'react';
import NewQuizlet from './NewQuizlet/NewQuizlet.js';
import ExistingQuizlet from './ExistingQuizlet/ExistingQuizlet.js';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      choice: 0,
      showMenu: true,
    } 
  }
  pickChoice = (choice) => {
    this.setState(() => {
      return {
        choice: choice,
        showMenu: false,
      }
    });
  }
  returnMenu = () => {
    this.setState(() => ({showMenu: true, choice: 0}));
  }
  render() {
    let choice = this.state.choice;
    console.log(choice);
    let showMenu = this.state.showMenu;
    return (
      <div className="App">
        { choice === 1 ? <NewQuizlet /> 
          : choice === 2 ? <ExistingQuizlet /> 
          : null }
        { showMenu ? <Menu pick={this.pickChoice}/> 
          : <div className="exit-menu" onClick={this.returnMenu}>X</div>}
      </div>
    )
  }
}

//the menu
const Menu = ({pick}) => {
  return [<div key="1" className="new-quizlet" onClick={() => {pick(1)}}>New Quizlet </div>,
    <div key="2" className="existing-quizlet" onClick={() => {pick(2)}}>Existing Quizlet</div> ] 
};

export default App;
