import React from 'react';
import type { TodoItemProps } from '../TodoItem';
import type { TodoTemplateProps } from '../TodoTemplate';

interface useHandleTodoUpdateDependencies {
	todoItems: TodoItemProps[];
	setTodoItems: React.Dispatch<React.SetStateAction<TodoItemProps[]>>;
	editIndex: number;
	setEditIndex: React.Dispatch<React.SetStateAction<number>>;
}

const useHandleTodoUpdate = ({
	todoItems,
	setTodoItems,
	editIndex,
	setEditIndex,
}: useHandleTodoUpdateDependencies) => {
	return React.useCallback<TodoTemplateProps['onTemplateSubmit']>(
		(entry) => {
			setTodoItems([
				...todoItems.slice(0, editIndex),
				entry,
				...todoItems.slice(editIndex + 1),
			]);
			setEditIndex(-1);

			fetch('/api/todos', {
				method: 'PUT',
				headers: new Headers({
					'content-type': 'application/json',
				}),
				body: JSON.stringify(entry),
			});
		},
		[todoItems, setTodoItems, editIndex, setEditIndex]
	);
};
export default useHandleTodoUpdate;
