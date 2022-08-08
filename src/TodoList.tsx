import React, {FC, PropsWithChildren,KeyboardEvent,ChangeEvent, useState} from 'react';
import {FilterValuesType} from "./App";

type TodoListPropsType = {
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    changeFilter: (filter: FilterValuesType) => void
    onClickAddTask: (title: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean)=> void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList: FC<TodoListPropsType> = (props: PropsWithChildren<TodoListPropsType>) => {

    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)
    const tasksItems =props.tasks.length ?
        props.tasks.map((task: TaskType) => {
        return (
            <li key={task.id} className={task.isDone ? 'isDone': ''}>
                <input
                    onChange={(e)=>props.changeTaskStatus(task.id, e.currentTarget.checked)}
                    type="checkbox"
                    checked={task.isDone}
                   />
                <span className={task.isDone ? 'isDone': ''}>{task.title}</span>
                <button onClick={() => props.removeTask(task.id)}>X</button>
            </li>
        )
    })
        : <span>Task list is empty!</span>

    const onClickAddTask = () => {
        const trimSpaces = title.trim()
        if(trimSpaces) {
            props.onClickAddTask(trimSpaces)
        } else {
            setError(true)
        }
        setTitle('')
    }

    const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && onClickAddTask()

    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError((false))
        setTitle(e.currentTarget.value)
    }

    const onClickSetFilterCreator = (filter: FilterValuesType)  => {
        return ()=> props.changeFilter(filter)
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    className={error ? 'error': ''}
                    value={title}
                    onChange={onChangeSetTitle}
                    onKeyDown={onKeyDownAddTask}
                />
                <button onClick={onClickAddTask}>+</button>
                {error && <div style={{color:'hotpink'}}>You have to type up something!</div>}
            </div>
            <ul>
                { tasksItems }
            </ul>
            <div>
                <button className={props.filter==='all' ? 'btn-active': ''}
                        onClick={onClickSetFilterCreator('all')}>All</button>

                <button className={props.filter==='Active' ? 'btn-active': ''}
                        onClick={onClickSetFilterCreator('Active')}>Active</button>

                <button className={props.filter==='Completed' ? 'btn-active': ''}
                    onClick={onClickSetFilterCreator('Completed')}>Completed</button>
            </div>
        </div>
    );
};

export default TodoList;

