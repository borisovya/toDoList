import {v1} from "uuid";
import {TasksStateType} from "../App";
import {TaskType} from "../Todolist";
import {addTodolistACType, removeTodolistACType} from "./todolists-reducer";


export const tasksReducer = (state = initialState, action: ActionsType): TasksStateType => {

    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state, [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.taskId)
            }

        case 'ADD-TASK':
            let newTask: TaskType = {id: v1(), title: action.title, isDone: false}
            return {
                ...state, [action.todolistId]: [newTask, ...state[action.todolistId]]
            }

        case 'CHANGE-STATUS':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId ? {
                    ...task,
                    isDone: action.isDone
                } : task)
            }

        case 'CHANGE-TITLE':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskId ? {
                    ...el,
                    title: action.newTitle
                } : el)
            }

        case 'ADD-TODOLIST':
            return {
                ...state, [action.payload.todolistId]: []
            }

        case 'REMOVE-TODOLIST':
            // const[[action.payload.todolistId]:[],...rest] = {...state} // удаление через деструктуризацию
            let copyState = {...state}
            delete copyState[action.payload.todolistId]
            return copyState


        default:
            return state
    }
}



const initialState: TasksStateType = {
        // [todolistId1]: [
        //     {id: v1(), title: "HTML&CSS", isDone: true},
        //     {id: v1(), title: "JS", isDone: true}
        // ],
        // [todolistId2]: [
        //     {id: v1(), title: "Milk", isDone: true},
        //     {id: v1(), title: "React Book", isDone: true}
        // ]
}

type ActionsType =
    removeTaskACType
    | addTaskACType
    | changeTaskStatusACType
    | changeTaskTitleACType
    | addTodolistACType
    | removeTodolistACType

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
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
    return {
        type: 'CHANGE-STATUS',
        taskId: taskId,
        isDone: isDone,
        todolistId: todolistId
    } as const
}

type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (taskId: string, newTitle: string, todolistId: string) => {
    return {
        type: 'CHANGE-TITLE',
        taskId: taskId,
        newTitle: newTitle,
        todolistId: todolistId
    } as const
}


