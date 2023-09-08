import React from 'react'
import { TodoItemProps } from '../TodoItem';

interface useHandleTodoDeleteDependencies {
    todoItems: TodoItemProps[];
    setTodoItems: React.Dispatch<React.SetStateAction<TodoItemProps[]>>;
}

const useHandleTodoDelete = ({
    todoItems,
    setTodoItems,
}: useHandleTodoDeleteDependencies) => {
    return React.useCallback((i: number) => {
        setTodoItems([...todoItems.slice(0, i), ...todoItems.slice(i + 1)])
        fetch('/api/todos', {
            method: 'DELETE',
            headers: new Headers({
                'content-type': 'application/json',
            }),
            body: JSON.stringify([{ id: todoItems[i].id }]),
        })
    }, [todoItems, setTodoItems])
}
export default useHandleTodoDelete;

