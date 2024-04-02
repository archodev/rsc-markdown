# rsc-markdown

`npm i rsc-markdown`

Markdown for react server components

---

`rsc-markdown`, a powerful markdown rendering library for React Server Components. This library uses `remark` and `rehype` to provide a powerful server component for rendering markdown content. Compatible with react, nextjs, and remix.

## Features

- 🚀 **Server-Side Rendering**: Built as a React Server Component, ensuring lightning-fast performance by rendering markdown content directly on the server.
- 🔒 **Safe Rendering**: Converts markdown to jsx without converting using dangerouslySetInnerHtml, thanks to `rehype-react`.
- 📝 **Remark and Rehype Powered**: Utilizes the powerful and flexible parsing and transformation capabilities of remark and rehype.
- 🎨 **Custom Components**: Allows for the substitution of standard markdown elements with custom React components.
- 🔧 **Configurable Options**: Supports options like trimming white space, GitHub Flavored Markdown (GFM), and syntax highlighting for code blocks.
- 🌈 **Syntax Highlighting**: Integrated with rehype-prism-plus for beautiful syntax highlighting in code blocks.

## Installation

To use **rsc-markdown** in your project, you can install it via npm or yarn:

```bash
npm install rsc-markdown
```

```bash
yarn add rsc-markdown
```

## Usage

`rsc-markdown` is designed for Next.js, Remix, and React 19.

Server Component:

```jsx
'use server';

import Markdown from 'rsc-markdown';

const markdownContent = ` # Welcome to rsc-markdown This is a **powerful** library for rendering markdown in React Server Components. `;

function MyComponent() {
  return <Markdown markdown={markdownContent} />;
}
```

Client Component:

```jsx
'use client';

import Markdown from 'rsc-markdown';

const markdownContent = ` # Welcome to rsc-markdown This is a **powerful** library for rendering markdown in React Server Components. `;

function MyComponent() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Markdown markdown={markdownContent} />
    </Suspense>
  );
}
```

With Api:

```jsx
'use server';

import Markdown from 'rsc-markdown';

const prisma = new PrismaClient();

export default async function MyComponent() {
  const markdown = await fetch('/api/markdown').then((res) => res.text());

  return <Markdown markdown={markdown} />;
}
```

### Props

- `markdown`: The markdown content to be rendered. (Required)
- `options`: Configuration options (Optional):
  - `trimWhiteSpace`: Trims leading white space from each line in the markdown content.
  - `gfm`: Enables GitHub Flavored Markdown.
  - `syntaxHighlighting`: Enables syntax highlighting for code blocks.
  - `components`: An optional object to override default HTML elements with custom React components.

## Custom Components

You can replace standard markdown elements with your custom components. For example, to use a custom component for rendering links:

```jsx
import Markdown from 'rsc-markdown';

const components = {
  a: ({ href, children }) => (
    <a href={href} style={{ color: 'red' }}>
      {children}
    </a>
  ),
};

const markdownContent = `[Custom Link](https://example.com)`;

function MyComponent() {
  return <Markdown markdown={markdownContent} components={components} />;
}
```

## Note

`rsc-markdown` is a server component, so to use it inside of a client component you must wrap in suspense.

## Contributing

We welcome contributions to **rsc-markdown**! Whether it's adding new features, improving documentation, or reporting bugs, please feel free to open an issue or submit a pull request. Thank you for considering **rsc-markdown** for your markdown rendering needs in React Server Components.
