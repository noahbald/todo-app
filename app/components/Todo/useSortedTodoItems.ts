import React from "react";
import type { TodoItemProps } from "../TodoItem";

const useSortedTodoItems = (todoItems: TodoItemProps[]) => (
    React.useMemo(() => {
        return todoItems
            .sort((a, b) => Number(a.deadline) - Number(b.deadline))
            .sort((a, b) => a.priority - b.priority);
    }, [todoItems])
);
export default useSortedTodoItems;

