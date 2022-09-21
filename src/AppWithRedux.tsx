import React, {useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./Components/AddItemForm";
import {Container, Grid, Paper,} from '@material-ui/core';
import ButtonAppBar from "./Components/AppBar";
import {
    AddTodolistAC,
    changeTodolistFilterAC,
    changeTodoListTitleAC,
    RemoveTodolistAC,
    todolistsReducer
} from "./State/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./State/tasks-reducer";
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
    // let todolistId1 = v1();
    // let todolistId2 = v1();

    // let [todolists, dispatchToToDoLists] = useReducer(todolistsReducer,[
    //     {id: todolistId1, title: "What to learn", filter: "all"},
    //     {id: todolistId2, title: "What to buy", filter: "all"}
    // ])

    // let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
    //     [todolistId1]: [
    //         {id: v1(), title: "HTML&CSS", isDone: true},
    //         {id: v1(), title: "JS", isDone: true}
    //     ],
    //     [todolistId2]: [
    //         {id: v1(), title: "Milk", isDone: true},
    //         {id: v1(), title: "React Book", isDone: true}
    //     ]
    // });


    let todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    const dispatch = useDispatch()

    function removeTask(id: string, todolistId: string) {
        let action = removeTaskAC(id, todolistId)
        dispatch(action)

    }

    function addTask(title: string, todolistId: string) {
        dispatch(addTaskAC(title, todolistId))
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        dispatch(changeTaskStatusAC(id, isDone, todolistId))
    }

    const updateTask = (todolistId: string, taskId: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(todolistId, taskId, newTitle))
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        dispatch(changeTodolistFilterAC(todolistId, value))
    }

    function removeTodolist(id: string) {
        let action = RemoveTodolistAC(id)
        dispatch(action)
    }

    const addTodoList = (newTitle: string) => {
        let action = AddTodolistAC(newTitle)
        dispatch(action)
    }

    const updateTodoList = (todolistId: string, newTitle: string) => {
        dispatch(changeTodoListTitleAC(todolistId, newTitle))
    }

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

                            return <Grid item>
                                <Paper elevation={16} style={{padding: '15px', borderRadius: '15px'}}>
                                    {/*<Todolist*/}
                                    {/*    key={tl.id}*/}
                                    {/*    id={tl.id}*/}
                                    {/*    title={tl.title}*/}
                                    {/*    tasks={tasksForTodolist}*/}
                                    {/*    removeTask={removeTask}*/}
                                    {/*    changeFilter={changeFilter}*/}
                                    {/*    addTask={addTask}*/}
                                    {/*    changeTaskStatus={changeStatus}*/}
                                    {/*    filter={tl.filter}*/}
                                    {/*    removeTodolist={removeTodolist}*/}
                                    {/*    updateTask={updateTask}*/}
                                    {/*    updateTodoList={updateTodoList}*/}
                                    {/*/>*/}
                                    <TodolistWithRedux key={tl.id} todolist={tl} />
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