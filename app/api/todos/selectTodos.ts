import { Connection } from "mysql2/promise";
import { priority } from "../../types";
import { NoteItemData, TodoItemData } from "./types";

async function selectTodos(connection: Connection): Promise<TodoItemData[]> {
    const [todoRows] = await connection.execute('SELECT * FROM todos');
    if (!Array.isArray(todoRows)) {
        throw new Error('Todo results is not iterable');
    }

    console.log('queried', todoRows.length, 'todos')
    const todoIDs = (todoRows as Partial<TodoItemData>[]).map((result) => result.id || 'NULL');
    const notesPromise = connection.query('SELECT * FROM notes WHERE todo_id IN (?)', [todoIDs]);

    const todos = todoRows.map((result: Partial<TodoItemData>): TodoItemData => ({
        id: result.id || '',
        title: result.title || '',
        description: result.description || '',
        priority: result.priority || priority.low,
        deadline: new Date(result.deadline || Date.now()),
        status: result.status || 'In progress',
        notes: [],
    }));

    const [noteRows] = await notesPromise;
    const noteIDMap: Record<string, string[]> = {};
    if (!Array.isArray(noteRows)) {
        throw new Error('Notes results is not iterable');
    }

    console.log('queried', noteRows.length, 'notes');
    (noteRows as Partial<NoteItemData>[]).forEach((note) => {
        noteIDMap[note.todo_id || ''] = noteIDMap[note.todo_id || ''] || [];
        noteIDMap[note.todo_id || ''].push(note.note || '');
    });

    todos.forEach((todo) => {
        todo.notes = noteIDMap[todo.id] || [];
    });
    return todos;
}
export default selectTodos;

