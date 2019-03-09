import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import './App.css';
import TaskList from "./containers/TaskList/TaskList";
import TaskDetail from "./containers/TaskDetail/TaskDetail";
import TaskAdd from "./containers/TaskAdd/TaskAdd";


class App extends Component {
    render() {
        return (
            <div className="container">
                <BrowserRouter>
                    <Switch>
                        <Route path="/" render={()=> <TaskList/>} exact />
                        <Route path="/tasks/:id" component={TaskDetail}/>
                        {/*<Route path="/" component={TaskList}/>*/}
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
