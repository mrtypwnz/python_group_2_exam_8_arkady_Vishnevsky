import React, {Component} from 'react'
import {TASKS_URL} from "../../Api_Urls";
import {NavLink} from "react-router-dom";
import axios from 'axios';


class TaskDetail extends Component {
    state = {
        task: null
    };

    componentDidMount() {
        const match = this.props.match;

        axios.get(TASKS_URL + match.params.id)
            .then(response => {console.log(response.data); return response.data;})
            .then(task => this.setState({task}))
            .catch(error => console.log(error));
    }

    render() {
        if (!this.state.task) return null;

        const {summary, description, due_date, status, time_planned} = this.state.task;

        return <div>
            <h1>{summary}</h1>

            <p>статус: {status}</p>
            <p className="text-secondary">время на задачу: {time_planned}</p>
            {description ? <p>{description}</p> : null}

            <NavLink to='' className="btn btn-primary">Задачи</NavLink>
        </div>;
    }
}


export default TaskDetail;
