import React, {Component} from 'react';
import {TASKS_URL} from "../../Api_Urls";
import DatePicker from "react-datepicker";
import axios from 'axios';


class TaskAdd extends Component {
    state = {
        task: {
            summary: "",
            description: "",
            due_date: "",
            time_planned: "",
            status: "todo"
        },

        alert: null,

        submitDisabled: false
    };


    updateTaskState = (fieldName, value) => {
        console.log(value);
        this.setState(prevState => {
            let newState = {...prevState};
            let task = {...prevState.task};
            task[fieldName] = value;
            newState.task = task;
            return newState;
        });
    };

    inputChanged = (event) => {
        const value = event.target.value;
        const fieldName = event.target.name;
        this.updateTaskState(fieldName, value);
    };

    dateChanged = (field, date) => {
        this.updateTaskState(field, date.toISOString());
    };


    formSubmitted = (event) => {
        event.preventDefault();

        this.setState(prevState => {
            let newState = {...prevState};
            newState.submitDisabled = true;
            return newState;
        });

        axios.post(TASKS_URL, this.state.task)
            .then(response => {
                console.log(response.data);
                if (response.status === 201) return response.data;
                throw new Error('Task was not created');
            })
            .then(task => this.props.history.replace('/'))
            .catch(error => {
                console.log(error);
                this.setState(prevState => {
                    let newState = {...prevState};
                    newState.alert = {type: 'danger', message: `Task was not added!`};
                    newState.submitDisabled = false;
                    return newState;
                });
            });
    };

    render() {
        const {summary, description, due_date, time_planned} = this.state.task;

        let alert = null;
        if (this.state.alert) {
            alert = <div className={"alert alert-" + this.state.alert.type}>{this.state.alert.message}</div>
        }

        const due_date_selected = due_date ? new Date(due_date) : null;


        return <div>
            {alert}
            <form onSubmit={this.formSubmitted}>
                <div className="form-group">
                    <label className="font-weight-bold">Задача: </label>
                    <input type="text" className="form-control" name="summary" value={summary}
                           onChange={this.inputChanged}/>
                </div>
                <div className="form-group">
                    <label>Описание: </label>
                    <input type="text" className="form-control" name="description" value={description}
                           onChange={this.inputChanged}/>
                </div>
                <div className="form-group">
                    <label className="font-weight-bold">Срок выполнения задачи</label>
                    <div>
                        <DatePicker dateFormat="yyyy-MM-dd HH-MM-SS" selected={due_date_selected}
                                    className="form-control" showTimeSelect
                                    name="due_date" onChange={(date) => this.dateChanged('due_date', date)}/>
                    </div>
                </div>
                <div className=" form-group">
                    <label>Время на задачу: </label>
                    <input type="integer" className="form-control" name="time_planned" value={time_planned}
                           onChange={this.inputChanged}/>
                </div>
                <button disabled={this.state.submitDisabled} type=" submit"
                        className=" btn btn-primary">Сохранить
                </button>
            </form>
        </div>;
    }
}


export default TaskAdd;