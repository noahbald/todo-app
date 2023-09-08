import { Connection } from "mysql2/promise";
import { TodoItemData } from "./types";

async function insertTodos(connection: Connection, todos: TodoItemData[]) {
    const promises: Promise<any>[] = [];
    const todoData = todos.map((todos) => ([
        todos.id,
        todos.title,
        todos.description,
        todos.priority,
        new Date(todos.deadline).toISOString().split('T')[0],
        todos.status,
    ]));
    promises.push(
        connection
            .query('INSERT INTO todos (id, title, description, priority, deadline, status) VALUES ?', [todoData])
            .then(([result]) => console.log('Inserted', (result as any).affectedRows, 'todos'))
    );

    const notesData = todos.reduce<string[][]>((notes, todo) => {
        return [
            ...notes,
            ...todo.notes.map((note) => ([
                todo.id,
                note,
            ])),
        ]
    }, []);
    if (notesData.length) {
        promises.push(
            connection
                .query('INSERT INTO notes (todo_id, note) VALUES ?', [notesData])
                .then(([result]) => console.log('Inserted', (result as any).affectedRows, 'notes'))
        );
    }

    await Promise.all(promises);
}
export default insertTodos;

