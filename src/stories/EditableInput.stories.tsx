import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {EditableInput} from "../Components/EditableInput";
import {action} from "@storybook/addon-actions";


export default {
  title: 'ToDoList/EditableInput',
  component: EditableInput,

  argTypes: {
    title: {
      description: 'Title'
    },
    callBack: {
      description: 'Changing span/input title'
}
  }

} as ComponentMeta<typeof EditableInput>;


const Template: ComponentStory<typeof EditableInput> = (args) => <EditableInput {...args} />;


export const EditableInputStory = Template.bind({});

EditableInputStory.args = {
  title: 'Double click on me',
  callBack: action('EditableInput changed')
};

