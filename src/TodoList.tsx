import React, {FC, PropsWithChildren} from 'react';

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
}

export type TaskType = {
    title: string
    isDone: boolean
    id: number
}

const TodoList: FC<TodoListPropsType> = (props: PropsWithChildren<TodoListPropsType>) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                <li><input type="checkbox" checked={props.tasks[0].isDone}/> <span>{props.tasks[0].title}</span></li>
                <li><input type="checkbox" checked={props.tasks[1].isDone}/> <span>{props.tasks[1].title}</span></li>
                <li><input type="checkbox" checked={props.tasks[2].isDone}/> <span>{props.tasks[2].title}</span></li>
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
};

export default TodoList;

