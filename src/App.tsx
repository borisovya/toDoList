import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'Active' | 'Completed'

function App() {

    const todoListTitle = "What to learn"
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JS", isDone: false},
        {id: v1(), title: "TypeScript/React", isDone: false},
    ])


    const [filter, setFilter] = useState('all')
    let colander = tasks
    if (filter === 'Active') {
        colander = tasks.filter(el => el.isDone !== true)
    }
    if (filter === 'Completed') {
        colander = tasks.filter(el => el.isDone === true)
    }

    const addTask = (title: string) => {
        setTasks([{id: v1(),title: title,isDone: false}, ...tasks])
    }

    const removeTask = (taskID: string) => {
        setTasks(tasks.filter(task => task.id !== taskID))
    }

    const changeFilter = (filter: string) => {
        setFilter(filter)
    }

    return (
        <div className="App">
            <TodoList
                title={todoListTitle}
                tasks={colander}
                removeTask={removeTask}
                changeFilter={changeFilter}
                onClickAddTask={addTask} />
        </div>
    );
}

export default App;
