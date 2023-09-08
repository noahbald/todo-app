import React from "react";
import type { TodoTemplateProps } from ".";

interface useHandleTemplateSubmitDependencies extends TodoTemplateProps {}

const useHandleTemplateSubmit = ({
    onTemplateSubmit,
    initialInputs,
}: useHandleTemplateSubmitDependencies) => {
    return React.useCallback((event: React.FormEvent<HTMLFormElement>) => {
        const $target = event.target;
        if (!($target instanceof HTMLFormElement)) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();

        const formData = new FormData($target);
        // TODO: Would be good to do some schema validation here
        const formObject = Object.fromEntries(formData) as unknown as Parameters<typeof onTemplateSubmit>[0];
        const notes = Object.keys(formObject)
        .filter((key) => key.startsWith('note-'))
        .map((key) => (formObject[key as keyof typeof formObject] as string));

        onTemplateSubmit({
            ...initialInputs,
            title: formObject.title,
            description: formObject.description,
            deadline: new Date(formObject.deadline),
            priority: formObject.priority,
            status: initialInputs?.status || 'In progress',
            id: initialInputs?.id || crypto.randomUUID(),
            notes: notes || [],
        });
    }, [onTemplateSubmit, initialInputs]);
}
export default useHandleTemplateSubmit;

