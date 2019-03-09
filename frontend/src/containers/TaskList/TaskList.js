import React, {Component} from 'react'
import {TASKS_URL} from "../../Api_Urls";
import axios from 'axios';
import {Container, Row, Col} from 'reactstrap';
import {NavLink} from "react-router-dom";
import TaskCard from '../../components/TaskCard/TaskCard';


class TaskList extends Component {
    state = {
        tasks: [],
    };

    componentDidMount() {
        axios.get(TASKS_URL)
            .then(response => {console.log(response.data); return response.data.results;})
            .then(tasks => this.setState({tasks:tasks}))
            .catch(error => console.log(error));
    }

    render() {
        return <Container>
            <p><NavLink to='/add'>Добавить задачу</NavLink></p>
            <Row>
                <Col md="4">
                    <h2>Queue</h2>
                    {this.state.tasks.map(task => {
                        if (task.status === 'todo') {
                            return <div key={task.id}>
                                <TaskCard task={task}/>
                            </div>
                        }
                    })}
                </Col>
                <Col md="4">
                    <h2>Current tasks</h2>
                    {this.state.tasks.map(task => {
                        if (task.status === 'progress') {
                            return <div key={task.id}>
                                <TaskCard task={task}/>
                            </div>
                        }
                    })}
                </Col>
                <Col md="4">
                    <h2>Done</h2>
                    {this.state.tasks.map(task => {
                        if (task.status === 'done') {
                            return <div key={task.id}>
                                <TaskCard task={task}/>
                            </div>
                        }
                    })}
                </Col>
            </Row>
        </Container>
    }
}

export default TaskList;