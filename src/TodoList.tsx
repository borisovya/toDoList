import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./Components/AddItemForm";
import {EditableInput} from "./Components/EditableInput";
import {Button, IconButton} from "@mui/material";
import {Delete, Fingerprint} from "@material-ui/icons";
import { Checkbox } from '@material-ui/core';


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    filter: FilterValuesType
    updateTask: (todolistId: string, taskId: string, newTitle: string)=>void
    updateTodoList: (todolistId: string, newTitle: string)=>void
}

export function Todolist(props: PropsType) {

    const removeTodolist = () => props.removeTodolist(props.id)


    const onAllClickHandler = () => props.changeFilter("all", props.id);

    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

    const addTaskHandler = (title: string) => {
        props.addTask(title, props.id)
    }

    const changeTodolistTitleHandler = (newTitle: string) => {
        props.updateTodoList(props.id, newTitle)
    }

    const updateTaskHandler = (taskID:string, newTitle: string) => {
        props.updateTask(props.id, taskID, newTitle)
    }


    return <div>
        <h3>
            <EditableInput title={props.title} callBack={changeTodolistTitleHandler}/>

            <IconButton onClick={removeTodolist}>
                <Delete />
            </IconButton>


        </h3>

       <AddItemForm callBack={addTaskHandler} />

        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox color={'primary'} onChange={onChangeHandler} checked={t.isDone}/>
                        <EditableInput callBack={(newTitle)=>updateTaskHandler(t.id, newTitle)} title={t.title}/>

                        <IconButton size='small' onClick={onClickHandler}>
                            <Delete />
                        </IconButton>

                    </li>
                })
            }
        </ul>
        <div>
            <Button variant={props.filter === 'all' ? "contained" : "text"} size='small'
                    onClick={onAllClickHandler}>All
            </Button>
            <Button variant={props.filter === 'active' ? "contained" : "text"} size='small'color={"success"}
                    onClick={onActiveClickHandler}>Active
            </Button>
            <Button variant={props.filter === 'completed' ? "contained" : "text"} size='small' color={"secondary"}
                    onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
}


