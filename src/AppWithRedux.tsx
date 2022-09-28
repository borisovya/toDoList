import React, {useCallback} from 'react';
import './App.css';
import {TaskType} from './Todolist';
import {AddItemForm} from "./Components/AddItemForm";
import {Container, Grid, Paper,} from '@material-ui/core';
import ButtonAppBar from "./Components/AppBar";
import {AddTodolistAC} from "./State/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./State/Store";
import {TodolistWithRedux} from "./TodolistWithRedux";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithRedux() {

    let todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)

    const dispatch = useDispatch()

    const addTodoList = useCallback((newTitle: string) => {
        let action = AddTodolistAC(newTitle)
        dispatch(action)
    }, [dispatch])


    return (
        <div className="App">
            <ButtonAppBar/>

            <Container fixed>
                <Grid container style={{padding: '10px'}}>
                    <AddItemForm callBack={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {

                            return <Grid item key={tl.id}>
                                <Paper elevation={16} style={{padding: '15px', borderRadius: '15px'}}>

                                    <TodolistWithRedux todolist={tl}/>


                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
