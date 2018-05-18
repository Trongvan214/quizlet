import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/BackToMenu.css';

export default class BackToMenu extends Component {
    render(){
        return (
            <div className="back-to-menu">
                <Link to="/">Home</Link>
            </div>
        )
    }
}