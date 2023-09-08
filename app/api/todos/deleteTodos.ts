import { Connection } from "mysql2/promise";
import { TodoItemData } from "./types";

export async function deleteTodos(connection: Connection, todos: Pick<TodoItemData, 'id'>[]) {
    const promises: Promise<any>[] = [];
    const todoIDs = todos.map((todo) => todo.id);
    promises.push(connection
        .query('DELETE FROM todos WHERE id IN (?)', [[todoIDs]])
        .then(([result]) => console.log('Deleted', (result as any).affectedRows, 'todos'))
    );
    promises.push(
        connection
            .query('DELETE FROM notes WHERE todo_id IN (?)', [[todoIDs]])
            .then(([result]) => console.log('Deleted', (result as any).affectedRows, 'notes'))
    );
    await Promise.all(promises);
}
export default deleteTodos;

