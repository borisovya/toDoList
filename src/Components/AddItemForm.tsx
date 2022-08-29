import React, {ChangeEvent, useState} from 'react';
import {Button, TextField} from "@mui/material";
import {IconButton} from "@material-ui/core";
import {ControlPoint} from "@material-ui/icons";

type PropsType = {
    callBack : (title: string)=>void
}

export const AddItemForm = (props:PropsType) => {
    const{callBack}=props

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const addTask = () => {
        let newTitle = title.trim();
        if (newTitle !== "") {
            callBack(newTitle);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    return (
        <div>
            <TextField value={title}
                   onChange={onChangeHandler}
                       id="standard-basic"
                       label="Type up here"
                       variant="outlined"
                       error={!!error}
                       helperText={error}
            />
            <IconButton color={'primary'} onClick={addTask}>
                <ControlPoint />
            </IconButton>


        </div>
    );
};
