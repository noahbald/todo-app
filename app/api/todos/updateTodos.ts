import type { Connection } from 'mysql2/promise';
import type { TodoItemData } from './types';

async function updateTodos(connection: Connection, todo: TodoItemData) {
	const promises: Promise<any>[] = [];
	const todoData = [
		todo.id,
		todo.title,
		todo.description,
		todo.priority,
		new Date(todo.deadline).toISOString().split('T')[0],
		todo.status,
	];

	promises.push(
		connection
			.query(
				'REPLACE INTO todos (id, title, description, priority, deadline, status) VALUES (?)',
				[todoData]
			)
			.then(([results]) =>
				console.log('Replaced', (results as any).affectedRows, 'todos')
			)
	);
	promises.push(
		connection
			.query('DELETE FROM notes WHERE todo_id = ?', [todo.id])
			.then(([results]) =>
				console.log('Deleted', (results as any).affectedRows, 'notes')
			)
	);

	const notesData = todo.notes.map((note) => [todo.id, note]);
	promises.push(
		connection
			.query('INSERT INTO notes (todo_id, note) VALUES ?', [notesData])
			.then(([results]) =>
				console.log('Inserted', (results as any).affectedRows, 'notes')
			)
	);
}
export default updateTodos;
