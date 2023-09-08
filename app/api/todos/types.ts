import type { TodoItemData as BaseTodoItemData } from '../../components/TodoItem';

export type TodoItemData = BaseTodoItemData;

export type NoteItemData = {
    id?: string,
    'todo_id': string,
    note: string,
}
