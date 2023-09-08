import React from 'react';
import { TodoItemProps, TodoItemData } from '../TodoItem';

const useTodoData = (setTodos: React.Dispatch<React.SetStateAction<TodoItemProps[]>>) => {
    React.useEffect(() => {
        (async () => {
            const todosResponse = await fetch('/api/todos');
            const todos = await todosResponse.json() as TodoItemData[];
            setTodos(todos.map((todo) => ({
                ...todo,
                deadline: new Date(todo.deadline),
                onEdit() {},
                onDelete() {},
                onSetStatus() {},
                onComplete() {},
            })))
        })();
    }, [])
}
export default useTodoData;

