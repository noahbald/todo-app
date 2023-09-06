import React from 'react';
import type { TodoItemProps } from '../TodoItem';
import type { TodoTemplateProps } from '../TodoTemplate';

interface useHandleTodoSubmitDependencies {
    todoItems: TodoItemProps[];
    setTodoItems: React.Dispatch<React.SetStateAction<TodoItemProps[]>>;
    setEditIndex: React.Dispatch<React.SetStateAction<number>>;
}

const useHandleTodoSubmit = ({
    todoItems,
    setTodoItems,
    setEditIndex,
}: useHandleTodoSubmitDependencies) => {
    return React.useCallback<TodoTemplateProps['onTemplateSubmit']>((entry) => {
        const todoItem: TodoItemProps = {
            ...entry,
            onEdit() {
                setEditIndex(todoItems.length);
            },
        }
        setTodoItems([...todoItems, todoItem])
    }, [todoItems, setTodoItems, setEditIndex]);
}
export default useHandleTodoSubmit;

