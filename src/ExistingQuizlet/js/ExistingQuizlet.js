import React, {Component} from 'react';
import '../css/ExistingQuizlet.css';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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
            <Grid>
                <h1>List of Quizlets</h1>
                { this.state.quizlets.length ? 
                        <Button className="exisitingQuizlet-edit" bsStyle="danger" bsSize="large" onClick={this.edit}>
                            EDIT
                        </Button> 
                        : 
                        <Button className="exisitingQuizlet-create" bsStyle="success" bsSize="large">
                            <Link to="/newquizlet">CREATE</Link>
                        </Button>
                }
                {
                    this.state.quizlets.map((title,i) => {
                        let _title = title;
                        let cards = JSON.parse(localStorage.getItem(title));
                        if(cards){
                            let length = cards.length;
                            return (
                                <Row className="existingquizlet-info" onClick={() => this.handleClick(title)} key={i}>
                                    {
                                        this.state.editMode ? 
                                        <Col md={1}> 
                                            <span 
                                                onClick={(e)=>this.delete(e,title)} 
                                                className="glyphicon glyphicon-trash">
                                            </span>
                                        </Col>
                                        : 
                                        null
                                    } 
                                    <Col md={4} className="existingquizlet-info-title"><span className="bold">{_title}</span></Col>
                                    <Col md={1}>|</Col>
                                    <Col md={2} className="existingquizlet-info-length">{length+" terms"}</Col>
                                </Row>
                            )
                        }
                        return null
                    })
                }
            </Grid>
        )
    }
}