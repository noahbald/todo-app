export enum Status {
	'In progress' = 'In progress',
	'Completed' = 'Completed',
}

type status = keyof typeof Status;
export default status;

export const statusTransitions: Record<status, status> = {
	[Status['In progress']]: Status.Completed,
	[Status.Completed]: Status['In progress'],
};
