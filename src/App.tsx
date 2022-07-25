import React from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";


function App() {
    const task1: Array<TaskType> = [
        {id: 1, title: "HTML", isDone: true},
        {id: 2, title: "CSS", isDone: true},
        {id: 3, title: "JS", isDone: false},
    ]

    const task2: Array<TaskType> = [
        {id: 1, title: "Terminator", isDone: false},
        {id: 2, title: "Alien", isDone: true},
        {id: 3, title: "Jentlemen of fortune", isDone: false},
    ]

    return (
        <div className="App">
            <TodoList title={"What to learn"} tasks={task1} />
            <TodoList title={"Movies"} tasks={task2} />

        </div>
    );
}

export default App;
