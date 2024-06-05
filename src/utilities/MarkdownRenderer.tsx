import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

interface MarkdownRendererProps {
  markdownContent: string;
}

function MarkdownRenderer(markdownContent : string) {
  const processor = unified()
    .use(remarkParse) // Parse markdown
    .use(remarkGfm) // Support GitHub Flavored Markdown
    .use(remarkHtml);

  const parsed = processor.parse(markdownContent);
  const htmlString = processor.stringify(parsed);

  return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
}

export default MarkdownRenderer;