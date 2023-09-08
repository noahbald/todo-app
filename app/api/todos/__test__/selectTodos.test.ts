import selectTodos from '../selectTodos';
import type { Connection } from 'mysql2/promise';
import { TodoItemData } from '../types';
import { priority } from '../../../types';

const mockTodoData = [
	{
		id: '1',
		title: 'title',
		description: 'description',
		priority: priority.low,
		deadline: new Date('01-01-2023'),
		status: 'In progress',
		notes: ['note 1'],
	},
] satisfies TodoItemData[];

const mockNotesData = [
	{
		todo_id: mockTodoData[0].id,
		note: mockTodoData[0].notes[0],
	},
] satisfies { todo_id: string; note: string }[];

const mockExecute = jest.fn(async () => {
	return [mockTodoData] as unknown as Awaited<
		ReturnType<Connection['execute']>
	>;
});

const mockQuery = jest.fn(async () => {
	return [mockNotesData] as unknown as Awaited<
		ReturnType<Connection['query']>
	>;
});

const mockConnection: Connection = {
	execute: mockExecute,
	query: mockQuery,
} satisfies Pick<Connection, 'query' | 'execute'> as unknown as Connection;

afterEach(() => {
	jest.clearAllMocks();
});

describe('api/todos/selectTodos', () => {
	it('Passes a string and data to MySQL', async () => {
		await selectTodos(mockConnection);
		// @ts-ignore Seems to be outdated types for jest tuples
		expect(typeof mockExecute.mock.calls[0][0]).toBe('string');
		// @ts-ignore Seems to be outdated types for jest tuples
		expect(mockExecute.mock.calls[0][1]).toBeUndefined();
		// @ts-ignore Seems to be outdated types for jest tuples
		expect(typeof mockQuery.mock.calls[0][0]).toBe('string');
		// @ts-ignore Seems to be outdated types for jest tuples
		expect(mockQuery.mock.calls[0][1]).toBeInstanceOf(Array);
		// @ts-ignore Seems to be outdated types for jest tuples
		expect(mockQuery.mock.calls[0][1][0][0]).toBe(mockTodoData[0].id);
	});

	it('Returns data from MySQL', async () => {
		const results = await selectTodos(mockConnection);
		const result = results[0];

		expect(results.length).toBe(1);
		expect(result.notes[0]).toBe(mockTodoData[0].notes[0]);
		expect(result.notes.length).toBe(1);
		expect(results).toEqual(mockTodoData);
	});
});
