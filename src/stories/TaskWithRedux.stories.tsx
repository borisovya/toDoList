import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import TaskWithRedux, {TaskType} from "../TaskWithRedux";
import {ReduxStoreProviderDecorator} from "./decorators/ReduxStoreProviderDecorator";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../State/Store";


export default {
    title: 'ToDoList/TaskWithRedux',
    component: TaskWithRedux,
    decorators: [ReduxStoreProviderDecorator]

} as ComponentMeta<typeof TaskWithRedux>;


const TaskWithReduxToStory = () => {
    const task = useSelector<AppRootStateType, TaskType>(state => state.tasks['todolistId1'][0])
    return <TaskWithRedux task={task} todolistId={'todolistId1'} />
}

const Template: ComponentStory<typeof TaskWithReduxToStory> = (args) => <TaskWithReduxToStory />;

export const TaskWithReduxStory = Template.bind({});

TaskWithReduxStory.args = {
    task: {id: '1', title: 'Task Title', isDone: true},
    todolistId: 'todolistId1'
};



