import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import Markdown from './markdown';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Markdown
      markdown={`
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

This is a paragraph with *italic*, **bold**, and ***bold italic*** text.

Here's an unordered list:
- Item 1
- Item 2
  - Subitem 1
  - Subitem 2
- Item 3

And an ordered list:
1. First item
2. Second item
3. Third item

You can also add [links](https://example.com) and images:

![Alt text](https://via.placeholder.com/200x200?text=Dummy%20Image)

> This is a blockquote.
> It can span multiple lines.

\`\`\`js {1,3-4} showLineNumbers
// This is a code block
function greet(name) {
  console.log(\`Hello, \${name}!\`);
}
\`\`\`

Horizontal Rule:

---

Tables:
| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Row 1, Cell 1 | Row 1, Cell 2 | Row 1, Cell 3 |
| Row 2, Cell 1 | Row 2, Cell 2 | Row 2, Cell 3 |
`}
    />
  </React.StrictMode>
);
