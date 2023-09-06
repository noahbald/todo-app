import React from "react";
import TodoItem, { type TodoItemProps } from "../TodoItem";
import TodoTemplate from "../TodoTemplate";
import useHandleTodoSubmit from "./useHandleTodoSubmit";
import useHandleTodoUpdate from "./useHandleTodoUpdate";

import './Todo.css';
import useSortedTodoItems from "./useSortedTodoItems";

const Todo: React.FC = () => {
    const [editIndex, setEditIndex] = React.useState(-1);
    const [todoItems, setTodoItems] = React.useState<TodoItemProps[]>([]);

    const handleTodoSubmit = useHandleTodoSubmit({ todoItems, setTodoItems, setEditIndex });
    const handleTodoUpdate = useHandleTodoUpdate({ todoItems, setTodoItems, editIndex, setEditIndex });

    const sortedTodoItems = useSortedTodoItems(todoItems);

    return (
        <div className="todo">
            {sortedTodoItems.map((todoItem, i) => i === editIndex ? (
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
                    onDelete={() => setTodoItems([...todoItems.slice(0, i), ...todoItems.slice(i + 1)])}
                    onSetStatus={(status) => {
                        const updateTodoItems = todoItems.slice();
                        updateTodoItems[i].status = status;
                        setTodoItems(updateTodoItems);
                    }}
                />
            ))}
            {editIndex === -1 && (
                <TodoTemplate
                    onTemplateSubmit={handleTodoSubmit}
                />
            )}
        </div>
    )
};
export default Todo;

