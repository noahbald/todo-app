import React from 'react';
import { marked } from 'marked';
import sanitizeHTML from 'sanitize-html';

const useMarkdown = (markdown: string) => {
	const sanitizedHTML = React.useMemo(() => {
		const dangerousHTML = marked.parse(markdown);
		return sanitizeHTML(dangerousHTML);
	}, [markdown]);
	return sanitizedHTML;
};
export default useMarkdown;
