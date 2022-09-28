import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import { TextField} from "@mui/material";
import {IconButton} from "@material-ui/core";
import {ControlPoint} from "@material-ui/icons";

type PropsType = {
    callBack : (title: string)=>void
}

export const AddItemForm = memo((props:PropsType) => {

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

    const onKeyPressHandler =(e: KeyboardEvent<HTMLInputElement>)=> {
        if(error) setError(null);
        if (e.charCode === 13) {
            addTask()
        }
    }

    return (
        <div>
            <TextField value={title}
                        onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
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
});
