import React, {ChangeEvent} from 'react';
import {AddItemForm} from "./Components/AddItemForm";
import {EditableInput} from "./Components/EditableInput";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@material-ui/icons";
import { Checkbox } from '@material-ui/core';
import {TodolistType} from "./AppWithRedux";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./State/Store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./State/tasks-reducer";
import {changeTodolistFilterAC, changeTodoListTitleAC, RemoveTodolistAC} from "./State/todolists-reducer";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolist: TodolistType
}

export function TodolistWithRedux({todolist}: PropsType) {

    // let todo = useSelector<AppRootStateType, TodolistType>(state => state.todolists.filter(todo=>todo.id)[0])
    let todo = useSelector<AppRootStateType, TodolistType>(state => state.todolists.find(todo=>todo.id) as TodolistType)

    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state=>state.tasks[todolist.id])
    const dispatch = useDispatch()

    const removeTodolist = () => dispatch(RemoveTodolistAC(todolist.id))


    const onAllClickHandler = () => dispatch(changeTodolistFilterAC(todolist.id,"all"));
    const onActiveClickHandler = () => dispatch(changeTodolistFilterAC(todolist.id, "active"));
    const onCompletedClickHandler = () => dispatch(changeTodolistFilterAC(todolist.id,"completed"));

    const addTaskHandler = (title: string) => {
        dispatch(addTaskAC(title, todolist.id))
    }

    const changeTodolistTitleHandler = (newTitle: string) => {
        dispatch(changeTodoListTitleAC(todolist.id, newTitle))
    }

    const updateTaskHandler = (taskID:string, newTitle: string) => {
        dispatch(changeTaskTitleAC(taskID, newTitle, todolist.id))
    }


    if (todolist.filter === "active") {
        tasks = tasks.filter(t => t.isDone === false);
    }
    if (todolist.filter === "completed") {
        tasks = tasks.filter(t => t.isDone === true);
    }

    return <div>
        <h3>
            <EditableInput title={todolist.title} callBack={changeTodolistTitleHandler}/>

            <IconButton onClick={removeTodolist}>
                <Delete />
            </IconButton>


        </h3>

       <AddItemForm callBack={addTaskHandler} />

        <ul>
            {
                tasks.map(t => {
                    const onClickHandler = () => dispatch(removeTaskAC(t.id, todolist.id))
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        dispatch(changeTaskStatusAC(t.id, newIsDoneValue, todolist.id))
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
            <Button variant={todolist.filter === 'all' ? "contained" : "text"} size='small'
                    onClick={onAllClickHandler}>All
            </Button>
            <Button variant={todolist.filter === 'active' ? "contained" : "text"} size='small'color={"success"}
                    onClick={onActiveClickHandler}>Active
            </Button>
            <Button variant={todolist.filter === 'completed' ? "contained" : "text"} size='small' color={"secondary"}
                    onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
}


