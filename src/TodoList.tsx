import React, {FC, PropsWithChildren,KeyboardEvent,ChangeEvent, useState} from 'react';
import {FilterValuesType} from "./App";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    changeFilter: (filter: FilterValuesType) => void
    onClickAddTask: (title: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList: FC<TodoListPropsType> = (props: PropsWithChildren<TodoListPropsType>) => {

    const [title, setTitle] = useState<string>('')

    const tasksItems = props.tasks.map((task: TaskType) => {
        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={() => props.removeTask(task.id)}>X</button>
            </li>
        )
    })

    const onClickAddTask = () => {
        title && props.onClickAddTask(title)
        setTitle('')
    }

    const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && onClickAddTask()

    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    // const onClickSetFilterAll = () => props.changeFilter('all')
    // const onClickSetFilterActive = () => props.changeFilter('Active')
    // const onClickSetFilterCompleted = () => props.changeFilter('Completed')

    // const onClickSetFilterCreatorAlt = (filter: FilterValuesType)  => () => props.changeFilter(filter)


    const onClickSetFilterCreator = (filter: FilterValuesType)  => {
        return ()=> props.changeFilter(filter)
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeSetTitle}
                    onKeyDown={onKeyDownAddTask}
                />
                <button onClick={onClickAddTask}>+</button>
            </div>
            <ul>
                {tasksItems}
            </ul>
            <div>
                <button onClick={onClickSetFilterCreator('all')}>All</button>
                <button onClick={onClickSetFilterCreator('Active')}>Active</button>
                <button onClick={onClickSetFilterCreator('Completed')}>Completed</button>
            </div>
        </div>
    );
};

export default TodoList;

