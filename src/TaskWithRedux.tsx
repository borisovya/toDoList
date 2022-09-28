import React, {ChangeEvent, memo, useCallback} from 'react';
import {Checkbox} from "@material-ui/core";
import {EditableInput} from "./Components/EditableInput";
import {IconButton} from "@mui/material";
import {Delete} from "@material-ui/icons";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./State/tasks-reducer";
import {useDispatch} from "react-redux";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TaskWithReduxPropsType = {
    task: TaskType
    todolistId: string
}

const TaskWithRedux = memo(({task, todolistId}: TaskWithReduxPropsType) => {

    const dispatch = useDispatch()

    const onClickHandler = () => dispatch(removeTaskAC(task.id, todolistId))
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        dispatch(changeTaskStatusAC(task.id, newIsDoneValue, todolistId))
    }

    const updateTaskHandler = useCallback((taskID: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(taskID, newTitle, todolistId))
    }, [dispatch, todolistId])

    return (
        <div>
            <li key={task.id} className={task.isDone ? "is-done" : ""}>
                <Checkbox color={'primary'} onChange={onChangeHandler} checked={task.isDone}/>
                <EditableInput callBack={(newTitle) => updateTaskHandler(task.id, newTitle)} title={task.title}/>

                <IconButton size='small' onClick={onClickHandler}>
                    <Delete/>
                </IconButton>

            </li>
        </div>
    );
});

export default TaskWithRedux;