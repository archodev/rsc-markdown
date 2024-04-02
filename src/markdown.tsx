'use server';

import React from 'react';
import * as prod from 'react/jsx-runtime';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeReact, { Components } from 'rehype-react';
import { unified } from 'unified';
import rehypeParse from 'rehype-parse';
import remarkGfm from 'remark-gfm';
import rehypePrism from 'rehype-prism-plus/all';
import { rehype } from 'rehype';

import './markdown.css';

const production = { Fragment: prod.Fragment, jsx: prod.jsx, jsxs: prod.jsxs };

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

// @ts-ignore
const Markdown: React.FC<Props> = async ({
  markdown,
  options,
  components,
}): Promise<React.ReactNode> => {
  const md = options?.trimWhiteSpace
    ? String(markdown).trim().replace(/^\s+/gm, '')
    : String(markdown);

  const html = options?.gfm
    ? await unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkRehype)
        .use(rehypeStringify)
        .process(md)
    : await unified()
        .use(remarkParse)
        .use(remarkRehype)
        .use(rehypeStringify)
        .process(md);

  const hl = options?.syntaxHighlighting
    ? await rehype().use(rehypePrism).process(String(html))
    : html;

  const file = await unified()
    .use(rehypeParse, { fragment: true })
    // @ts-ignore
    .use(rehypeReact, { ...production, components })
    .process(String(hl));
  return file.result as unknown as React.ReactNode;
};

export default Markdown;
