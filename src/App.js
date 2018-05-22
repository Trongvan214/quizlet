import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link } from 'react-router-dom';
import NewQuizlet from './NewQuizlet/js/NewQuizlet.js';
import ExistingQuizlet from './ExistingQuizlet/js/ExistingQuizlet.js';
import BackToMenu from './BackToMenu/js/BackToMenu';
import LearningCenter from './LearningCenter/LearningCenter'; 
import ToLearningCenter from './LearningCenter/ToLearningCenter'
import LearnCards from './LearningCenter/LearnCards/js/LearnCards';
// import WriteCards from './LearningCenter/WriteCards/js/WriteCards';
import FlashCards from './LearningCenter/FlashCards/js/FlashCards';
import './App.css';

class App extends Component {
  render(){
    return (
      <Router basename="/quizletApp">
        <div>
          <BackToMenu />
          <Route exact path="/" component={Menu} />
          <Route path="/existingquizlet" component={ExistingQuizlet} />
          <Route path="/newquizlet" component={NewQuizlet} />
          <Route path="/quizlet/:qname" component={ToLearningCenter} />
          <Route exact path="/quizlet/:qname" component={LearningCenter} />
          <Route path="/quizlet/:qname/learn" component={LearnCards} />
          {/* <Route path="/quizlet:qname/writecards" component={WriteCards} /> */}
          <Route path="/quizlet/:qname/flashcards" component={FlashCards} />

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
