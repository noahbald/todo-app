import React from 'react';
import TodoItem, { type TodoItemProps } from '../TodoItem';
import TodoTemplate from '../TodoTemplate';
import useHandleTodoSubmit from './useHandleTodoSubmit';
import useHandleTodoUpdate from './useHandleTodoUpdate';
import useSortedTodoItems from './useSortedTodoItems';
import useTodoData from './useTodoData';
import useHandleTodoDelete from './useHandleTodoDelete';
import useHandleTodoSetStatus from './useHandleTodoSetStatus';

import './Todo.css';

const Todo: React.FC = () => {
	const [editIndex, setEditIndex] = React.useState(-1);
	const [todoItems, setTodoItems] = React.useState<TodoItemProps[]>([]);

	const handleTodoSubmit = useHandleTodoSubmit({ todoItems, setTodoItems });
	const handleTodoUpdate = useHandleTodoUpdate({
		todoItems,
		setTodoItems,
		editIndex,
		setEditIndex,
	});
	const handleTodoSetStatus = useHandleTodoSetStatus({
		todoItems,
		setTodoItems,
	});
	const handleTodoDelete = useHandleTodoDelete({ todoItems, setTodoItems });

	const sortedTodoItems = useSortedTodoItems(todoItems);

	useTodoData(setTodoItems);

	return (
		<div className="todo">
			{sortedTodoItems.map((todoItem, i) =>
				i === editIndex ? (
					<TodoTemplate
						key={todoItem.id}
						onTemplateSubmit={handleTodoUpdate}
						initialInputs={todoItem}
					/>
				) : (
					<TodoItem
						key={todoItem.id}
						{...todoItem}
						onEdit={() => setEditIndex(i)}
						onDelete={() => handleTodoDelete(i)}
						onSetStatus={(status) => handleTodoSetStatus(status, i)}
					/>
				)
			)}
			{editIndex === -1 && (
				<TodoTemplate onTemplateSubmit={handleTodoSubmit} />
			)}
		</div>
	);
};
export default Todo;
