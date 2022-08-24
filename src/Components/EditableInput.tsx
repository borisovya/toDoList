import React, {ChangeEvent, useState} from 'react';

type PropsType = {
    title: string
    callBack: (newTitle: string)=> void
}

export const EditableInput = (props: PropsType) => {
const{title,callBack}=props
    const [edit, setEdit] = useState(false)
    const [newTitle, setNewTitle] = useState(props.title)

    const addTask = () => {
        if (newTitle.trim() !== "") {
            callBack(newTitle)
            setNewTitle(newTitle);
    }}

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
         setNewTitle(e.currentTarget.value)
    }

    const toggle = () => {
        setEdit(!edit)
        addTask()
    }

    return (
        edit
            ? <input onBlur={toggle} onChange={onChangeHandler} value={newTitle}/>
            : <span onDoubleClick={toggle}>{props.title}</span>
    );
};

