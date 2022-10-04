import React from "react";
import {Provider} from "react-redux";
import {AppRootStateType, store} from "../../State/Store";
import {tasksReducer} from "../../State/tasks-reducer";
import {todolistsReducer} from "../../State/todolists-reducer";
import {combineReducers, createStore} from "redux";
import {v1} from "uuid";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all'},
        {id: 'todolistId2', title: 'What to buy', filter: 'all'}
    ],
    tasks: {
        ['todolistId1']: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: false}
        ],
        ['todolistId2']: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'React Book', isDone: false}
        ]
    }
}

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType)

export const ReduxStoreProviderDecorator = (storyFn: ()=> JSX.Element) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)

