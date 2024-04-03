'use server';

import showdown, { ShowdownOptions } from 'showdown';
import parse, { HTMLReactParserOptions } from 'html-react-parser';

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
   * Custom components to replace the default html components..
   *
   * @example
   *
   * An example of how you can use the `components` prop:
   *
   * ```jsx
   * import Markdown from 'rsc-markdown'
   *
   * const components = {
   *   h1: ({ children }) => <h1 style={{ color: 'blue' }}>{children}</h1>,
   * };
   *
   * const MyComponent = () => {
   *   return <Markdown markdown="# Custom Heading" components={components} />
   * }
   * ```
   *
   * @since 1.0.0
   */
  components?: { [tagName: string]: React.ElementType };

  /**
   * Options to pass to `showdown`. Refer to [showdown](https://github.com/showdownjs/showdown?tab=readme-ov-file#valid-options) for more information.
   *
   * @since 1.1.0
   */
  markdownOptions?: ShowdownOptions;

  /**
   * Options to pass to `html-react-parser`. Refer to [html-react-parser](https://github.com/remarkablemark/html-react-parser?tab=readme-ov-file#options) for more information.
   *
   * Note:
   * The `replace` option is supported, but it is recommended to use the `components` prop instead.
   *
   * @since 1.1.0
   */
  parseOptions?: Omit<HTMLReactParserOptions, 'replace'>;
}

const Markdown: React.FC<Props> = ({
  markdown,
  components,
  markdownOptions,
  parseOptions,
  className,
  ...props
}) => {
  const converter = new showdown.Converter(markdownOptions);
  const html = converter.makeHtml(markdown);

  const customParseOptions: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode instanceof HTMLElement) {
        if (domNode.attributes && components) {
          const CustomComponent = components[domNode.tagName.toLowerCase()];
          if (CustomComponent) {
            const attributes = Array.from(domNode.attributes).reduce<
              Record<string, string>
            >((acc, attr) => {
              acc[attr.name] = attr.value;
              return acc;
            }, {});
            return (
              <CustomComponent {...attributes}>
                {Array.from(domNode.childNodes).map((child) =>
                  child.nodeType === Node.ELEMENT_NODE
                    ? parse(
                        (child as HTMLElement).outerHTML,
                        customParseOptions
                      )
                    : child.textContent
                )}
              </CustomComponent>
            );
          }
        }
      }
    },
    ...parseOptions,
  };

  return (
    <div className={`rsc-markdown ${className}`} {...props}>
      {parse(html, customParseOptions)}
    </div>
  );
};

export default Markdown;
