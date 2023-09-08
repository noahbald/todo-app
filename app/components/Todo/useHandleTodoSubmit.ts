import React from 'react';
import type { TodoItemProps, TodoItemData } from '../TodoItem';
import type { TodoTemplateProps } from '../TodoTemplate';

interface useHandleTodoSubmitDependencies {
    todoItems: TodoItemProps[];
    setTodoItems: React.Dispatch<React.SetStateAction<TodoItemProps[]>>;
}

const useHandleTodoSubmit = ({
    todoItems,
    setTodoItems,
}: useHandleTodoSubmitDependencies) => {
    return React.useCallback<TodoTemplateProps['onTemplateSubmit']>((entry, postSubmission = true) => {
        const todoItem = {
            ...entry,
            notes: entry.notes || [],
            onEdit() {},
            onDelete() {},
            onSetStatus() {},
        };
        setTodoItems([...todoItems, todoItem]);

        if (!postSubmission) {
            return;
        }
        fetch('api/todos', {
            method: 'POST',
            headers: new Headers({
                'content-type': 'application/json',
            }),
            body: JSON.stringify([entry satisfies TodoItemData])
        });
    }, [todoItems, setTodoItems]);
}
export default useHandleTodoSubmit;

