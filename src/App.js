import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import NewQuizlet from './NewQuizlet/js/NewQuizlet.js';
import ExistingQuizlet from './ExistingQuizlet/js/ExistingQuizlet.js';
import BackToMenu from './BackToMenu/js/BackToMenu';
import LearningCenter from './LearningCenter/js/LearningCenter'; 
import './App.css';

class App extends Component {
  render(){
    return (
      <Router>
        <div>
          <BackToMenu />
          <Route exact path="/" component={Menu} />
          <Route path="/existingquizlet" component={ExistingQuizlet} />
          <Route path="/newquizlet" component={NewQuizlet} />
          <Route path="/learn/:qname" component={LearningCenter} />
        </div>
      </Router>
    )
  }
}

//the menu
const Menu = () => (
  <div className="menu-wrapper">
    <div className="menu-choice"><Link to="newquizlet">New Quizlet</Link></div>
    <div className="menu-choice"><Link to="/existingquizlet">Existing Quizlet</Link></div>
  </div>
);

export default App;
