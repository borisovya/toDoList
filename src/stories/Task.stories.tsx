import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {Task} from "../Task";
import {action} from "@storybook/addon-actions";


export default {
    title: 'ToDoList/Task',
    component: Task,

    args: {
        changeTaskStatus: action('change status'),
        changeTaskTitle: action('change title'),
        removeTask: action('remove task'),
        todolistId: '1',
    }

} as ComponentMeta<typeof Task>;


const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;


export const TaskIsDone = Template.bind({});

TaskIsDone.args = {
    task: {id: '1212', title: 'JS', isDone: true},
};



export const TaskIsNotDone = Template.bind({});

TaskIsNotDone.args = {
    task: {id: '1212', title: 'JS', isDone: false},
};

