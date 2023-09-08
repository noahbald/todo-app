import React from 'react';
import type { status } from '~/types';
import type { TodoItemProps } from '../TodoItem';

interface useHandleTodoSetStatusDependencies {
	todoItems: TodoItemProps[];
	setTodoItems: React.Dispatch<React.SetStateAction<TodoItemProps[]>>;
}

function useHandleTodoSetStatus({
	todoItems,
	setTodoItems,
}: useHandleTodoSetStatusDependencies) {
	return React.useCallback(
		(status: status, i: number) => {
			const updatedTodoItems = todoItems.slice();
			updatedTodoItems[i].status = status;
			setTodoItems(updatedTodoItems);

			fetch('api/todos', {
				method: 'PUT',
				headers: new Headers({
					'content-type': 'application/json',
				}),
				body: JSON.stringify(updatedTodoItems[i]),
			});
		},
		[todoItems, setTodoItems]
	);
}
export default useHandleTodoSetStatus;
