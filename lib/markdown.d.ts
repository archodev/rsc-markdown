import React from 'react';
import { Components } from 'rehype-react';
import './markdown.css';
/**
 * Props for the Markdown component.
 * @typedef {Object} Props
 * @property {string} markdown - The markdown content to be rendered.
 * @property {Object} [options] - Optional configuration for markdown rendering.
 * @property {boolean} [options.trimWhiteSpace=false] - Whether to trim leading and trailing white space from the markdown content.
 * @property {boolean} [options.gfm=true] - Whether to enable GitHub Flavored Markdown.
 * @property {boolean} [options.syntaxHighlighting=false] - Whether to enable syntax highlighting.
 * @property {Partial<Components>} [components] - Custom React components to use for rendering specific markdown elements.
 */
interface Props {
    markdown: string;
    options?: {
        trimWhiteSpace?: boolean;
        gfm?: boolean;
        syntaxHighlighting?: boolean;
    };
    components?: Partial<Components>;
}
declare const Markdown: React.FC<Props>;
export default Markdown;
