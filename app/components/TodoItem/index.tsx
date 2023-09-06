import React from "react";
import useMarkdown from "~/hooks/useMarkdown";
import { priority, status } from "~/types";
import { statusTransitions } from "~/types/status";
import { Check, Edit, Delete, Unchecked } from '~/icons';

import './TodoItem.css';

export interface TodoItemProps {
    title: string;
    description: string;
    notes: string[];
    priority: priority;
    deadline: Date;
    status: status;
    id: string;
    onEdit(): void;
    onDelete(): void;
    onSetStatus(status: status): void;
}

const TodoItem: React.FC<TodoItemProps> = ({
    title,
    description,
    notes,
    priority,
    deadline,
    status,
    onEdit,
    onDelete,
    onSetStatus,
}) => {
    const sanitizedDescriptionHTML = useMarkdown(description);

    return (
        <div className="todo-item">
            <div className="status-bar of-todo-item">
                <button
                    className="complete"
                    onClick={() => onSetStatus(statusTransitions[status])}
                >
                    {status === 'Completed' ? (
                        <Check />
                    ) : (
                        <Unchecked />
                    )}
                    Mark as {statusTransitions[status]}
                </button>
                <span className={`chip priority ${priority}`}>{priority}</span>
                <button className="edit" onClick={onEdit}>
                    <Edit />
                    <span className="visually-hidden" onClick={onEdit}>Edit</span>
                </button>
                <button className="delete" onClick={onDelete}>
                    <Delete />
                    <span className="visually-hidden">Delete</span>
                </button>
            </div>
            <h2>{title}</h2>
            <p>{deadline.toLocaleDateString()}</p>
            <div
                className="description of-todo-item"
                dangerouslySetInnerHTML={{ __html: sanitizedDescriptionHTML }}
            />
            <ul className="notes">
                {notes.map((note, i) => (
                    <li key={i}>{note}</li>
                ))}
            </ul>
            <hr />
        </div>
    )
};
export default TodoItem;

