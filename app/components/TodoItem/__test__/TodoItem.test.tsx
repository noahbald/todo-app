import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import TodoItem, { TodoItemProps } from '..';
import '@testing-library/jest-dom';
import { priority } from '~/types';

const onEdit = jest.fn();
const onDelete = jest.fn();
const onSetStatus = jest.fn();

const defaultTodoItemProps: TodoItemProps = {
	title: 'Title',
	description: 'Description',
	notes: ['Note'],
	priority: priority.low,
	deadline: new Date('01-01-2023'),
	status: 'In progress',
	id: '1',
	onEdit: onEdit,
	onDelete: onDelete,
	onSetStatus: onSetStatus,
	'data-testid': 'todo-item',
};

describe('<TodoItem />', () => {
	it('Renders TodoItem', () => {
		render(<TodoItem {...defaultTodoItemProps} />);
		const todoItem = screen.getByTestId('todo-item');

		expect(todoItem).toBeInTheDocument();
	});

	it('Triggers onEdit callback', () => {
		render(<TodoItem {...defaultTodoItemProps} />);
		const todoItem = screen.getByTestId('todo-item');
		const editTodoButton = todoItem.querySelector('.edit');
		if (!editTodoButton) {
			throw new Error('No "edit" button found in TodoItem');
		}

		fireEvent.click(editTodoButton);
		expect(onEdit).toHaveBeenCalledTimes(1);
	});

	// TODO: More tests
});
