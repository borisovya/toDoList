import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";
import {TasksStateType} from "../App";
import {TaskType} from "../Todolist";


export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state, [action.todolistId] : state[action.todolistId].filter(task=>task.id!==action.taskId)
            }

        case 'ADD-TASK':
            let newTask: TaskType = {id: v1(), title: action.title, isDone: false}
            return {
                ...state, [action.todolistId] : [newTask, ...state[action.todolistId]]
            }

        case 'CHANGE-STATUS':
            return {
                ...state, [action.todolistId] : [...state[action.todolistId].map(el=>el.id===action.taskId ? {...el, isDone: action.isDone} : el)]
            }

        case 'CHANGE-TITLE':
            return {
                ...state, [action.todolistId] : [...state[action.todolistId].map(el=>el.id===action.taskId ? {...el, title: action.newTitle} : el)]
            }


        default:
            return state
    }
}

type ActionsType = removeTaskACType | addTaskACType | changeTaskStatusACType | changeTaskTitleACType

type removeTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {
        type: 'REMOVE-TASK',
        taskId: taskId,
        todolistId: todolistId
    } as const
}

type addTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (title: string, todolistId: string) => {
    return {
        type: 'ADD-TASK',
        title: title,
        todolistId: todolistId
    } as const
}

type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (taskId: string, isDone:boolean, todolistId: string) => {
    return {
        type: 'CHANGE-STATUS',
        taskId: taskId,
        isDone: isDone,
        todolistId: todolistId
    } as const
}

type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (todolistId: string, taskId: string, newTitle: string) => {
    return {
        type: 'CHANGE-TITLE',
        taskId: taskId,
        newTitle: newTitle,
        todolistId: todolistId
    } as const
}


