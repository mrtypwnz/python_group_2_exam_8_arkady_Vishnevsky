import React from 'react';
import Card from '../UI/Card/Card';

const TaskCard = props => {
    const {task, className} = props;

    const {summary, description, due_date, time_planned, id} = task;

    const link = {
        text: 'Read more',
        url: '/tasks/' + id
    };

    return <Card header={summary} link={link} className='h-100' text={description} date={due_date} deadline={time_planned}/>
};


export default TaskCard;