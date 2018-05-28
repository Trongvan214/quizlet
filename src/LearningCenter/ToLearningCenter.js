import React from 'react';
import { Link } from 'react-router-dom';
import './css/ToLearningCenter.css';

export default ({qname}) => (
    <div className="tolearningcenter">
        <Link to={`/qname/${qname}`}>Learning Center</Link>
    </div>
)