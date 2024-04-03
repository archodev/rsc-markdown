import showdown from 'showdown';
import parse from 'html-react-parser';
import * as purify from 'dompurify';

interface HTMLReactParserOptions {
  replace?: (
    domNode: Element | any,
    index?: number
  ) => React.ReactElement | undefined;
  transform?: (
    reactNode: React.ReactElement,
    domNode: Element | any,
    index: number
  ) => React.ReactElement;
  library?: {
    cloneElement: (
      element: React.ReactElement,
      props: any,
      ...children: React.ReactNode[]
    ) => React.ReactElement;
    createElement: (
      type: any,
      props?: any,
      ...children: React.ReactNode[]
    ) => React.ReactElement;
    isValidElement: (object: any) => boolean;
  };
  htmlparser2?: {
    xmlMode?: boolean;
    decodeEntities?: boolean;
    lowerCaseTags?: boolean;
    lowerCaseAttributeNames?: boolean;
    recognizeCDATA?: boolean;
    recognizeSelfClosing?: boolean;
  };
  trim?: boolean;
}

interface ShowdownOptions {
  noHeaderId?: boolean;
  customizedHeaderId?: boolean;
  ghCompatibleHeaderId?: boolean;
  prefixHeaderId?: string | boolean;
  rawPrefixHeaderId?: boolean;
  rawHeaderId?: boolean;
  headerLevelStart?: number;
  parseImgDimensions?: boolean;
  simplifiedAutoLink?: boolean;
  excludeTrailingPunctuationFromURLs?: boolean;
  literalMidWordUnderscores?: boolean;
  literalMidWordAsterisks?: boolean;
  strikethrough?: boolean;
  tables?: boolean;
  tablesHeaderId?: boolean;
  ghCodeBlocks?: boolean;
  tasklists?: boolean;
  smoothLivePreview?: boolean;
  smartIndentationFix?: boolean;
  disableForced4SpacesIndentedSublists?: boolean;
  simpleLineBreaks?: boolean;
  requireSpaceBeforeHeadingText?: boolean;
  ghMentions?: boolean;
  ghMentionsLink?: string;
  encodeEmails?: boolean;
  openLinksInNewWindow?: boolean;
  backslashEscapesHTMLTags?: boolean;
  emoji?: boolean;
  underline?: boolean;
  ellipsis?: boolean;
  metadata?: boolean;
  splitAdjacentBlockquotes?: boolean;
  moreStyling?: boolean;
}

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
   * The flavor of markdown to use.
   *
   * @example
   *
   * Here's an example of how you can use the `falvor` prop:
   *
   * ```jsx
   * <Markdown markdown="# Hello, World!" flavor='github' />
   * ```
   *
   * @default 'commonmark'
   * @since 1.0.0
   */
  flavor?: 'commonmark' | 'github' | 'showdown';

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
  markdownOptions = {
    tables: true,
    ghCodeBlocks: true,
  },
  parseOptions,
  flavor = 'commonmark',
  className,
  ...props
}) => {
  const converter = new showdown.Converter(markdownOptions);

  converter.setFlavor(
    flavor === 'commonmark'
      ? 'original'
      : flavor === 'github'
      ? 'github'
      : 'vanilla'
  );

  const html = converter.makeHtml(markdown);

  const sanitizedHtml = purify.sanitize(html, {});

  const customParseOptions: HTMLReactParserOptions = {
    replace: (domNode) => {
      // @ts-ignore
      if (domNode.attribs) {
        const tagName = (
          domNode as never as { tagName: string }
        ).tagName.toLowerCase();
        if (components && components[tagName]) {
          const Component = components[tagName];
          return (
            // @ts-ignore
            <Component {...domNode.attribs}>
              {/* @ts-ignore */}
              {domNode.children.map((child) => child.data)}
            </Component>
          );
        }
      }
    },
    ...parseOptions,
  };

  return (
    <div className={`rsc-markdown ${className}`} {...props}>
      {/* @ts-ignore */}
      {parse(sanitizedHtml, customParseOptions)}
    </div>
  );
};

export default Markdown;
