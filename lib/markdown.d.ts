/// <reference types="react" />
import { ShowdownOptions } from 'showdown';
import { HTMLReactParserOptions } from 'html-react-parser';
interface Props extends React.HTMLProps<HTMLDivElement> {
    /**
     * The markdown content to render.
     *
     * @example
     *
     * Here's an example of how you can use the `markdown` prop:
     *
     * ```jsx
     * <Markdown markdown="# Hello, World!" />
     * ```
     *
     * @since 1.0.0
     */
    markdown: string;
    /**
     * Options to pass to `showdown`.
     */
    markdownOptions?: ShowdownOptions;
    /**
     * Options to pass to `html-react-parser`.
     */
    parseOptions?: HTMLReactParserOptions;
}
declare const Markdown: React.FC<Props>;
export default Markdown;
