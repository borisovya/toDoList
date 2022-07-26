import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";

export type FilterValuesType = 'all' | 'Active' | 'Completed'

function App() {

    const todoListTitle = "What to learn"
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: "HTML", isDone: true},
        {id: 2, title: "CSS", isDone: true},
        {id: 3, title: "JS", isDone: false},
    ])

    const [filter, setFilter] = useState<FilterValuesType>('all')


    const removeTask = (taskID: number) => {
        setTasks(tasks.filter(task => task.id !== taskID))
    }

    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    let tasksForRender;
    switch (filter) {
        case 'Active':
            tasksForRender = tasks.filter(task => task.isDone === false)
            break
        case 'Completed':
            tasksForRender = tasks.filter(task => task.isDone === true)
            break
        default:
            tasksForRender = tasks
    }

    return (
        <div className="App">
            <TodoList
                title={todoListTitle}
                tasks={tasksForRender}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
