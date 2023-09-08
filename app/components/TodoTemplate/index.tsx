import React from 'react';
import { priority } from '~/types';
import useHandleTemplateSubmit from './useHandleTemplateSubmit';
import type { TodoItemData, TodoItemProps } from '../TodoItem';

import './TodoTemplate.css';

export interface TodoTemplateProps {
	initialInputs?: TodoItemProps;
	onTemplateSubmit(entry: TodoItemData): void;
}

const TodoTemplate: React.FC<TodoTemplateProps> = ({
	initialInputs,
	onTemplateSubmit,
}) => {
	const [notesLength, setNotesLength] = React.useState(
		initialInputs?.notes.length || 0
	);

	const handleTemplateSubmit = useHandleTemplateSubmit({
		onTemplateSubmit,
		initialInputs,
	});

	return (
		<form className="todo-template" onSubmit={handleTemplateSubmit}>
			<h2>{initialInputs ? 'Edit an' : 'Create a new'} item</h2>
			<label htmlFor="title">Title</label>
			<input
				id="title"
				name="title"
				type="text"
				required
				placeholder="My task"
				defaultValue={initialInputs?.title}
			/>
			<label htmlFor="description">Description</label>
			<textarea
				id="description"
				name="description"
				required
				placeholder="> My description (you can use markdown here)"
				defaultValue={initialInputs?.description}
			/>
			<label htmlFor="deadline">Deadline</label>
			<input
				id="deadline"
				name="deadline"
				type="date"
				required
				defaultValue={
					initialInputs?.deadline.toISOString().split('T')[0]
				}
			/>
			<div role="radiogroup" aria-labelledby="priority">
				<div id="priority" aria-hidden>
					Priority
				</div>
				{Object.entries(priority)
					.filter(([priorityName]) =>
						Number.isNaN(Number(priorityName))
					)
					.map(([priorityName, priority]) => (
						<label key={priority} htmlFor={priorityName}>
							<input
								id={priorityName}
								name="priority"
								type="radio"
								required
								defaultChecked={
									initialInputs?.priority === priority
								}
								value={priorityName}
							/>
							{priorityName}
						</label>
					))}
			</div>
			{Array.from({ length: notesLength }, (_, i) => (
				<React.Fragment key={i}>
					<label htmlFor={`note-${i}`}>Note {i + 1}</label>
					<input
						id={`note-${i}`}
						name={`note-${i}`}
						required
						defaultValue={initialInputs?.notes?.[i]}
					/>
					{i === notesLength - 1 && (
						<button
							type="button"
							onClick={() => setNotesLength(notesLength - 1)}
						>
							Remove note {i + 1}
						</button>
					)}
				</React.Fragment>
			))}
			<button
				type="button"
				onClick={() => setNotesLength(notesLength + 1)}
			>
				Add note
			</button>
			<button>Submit</button>
			<hr />
		</form>
	);
};
export default TodoTemplate;
