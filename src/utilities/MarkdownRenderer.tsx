import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import { css } from "@emotion/react";
import { ThemeVariables, themeSizes } from "./Theme";

const container = css`
	display: grid;
	grid-auto-flow: column;
	grid-auto-columns: 1fr;
	grid-template-rows: auto 1fr;
	gap: 1rem;
	text-align: center;

	h1, h2 {
			background-color: var(${ThemeVariables.contentHeaderBgColor});
			box-shadow: var(${ThemeVariables.contentHeaderShadow});
			border-radius: 0.75rem;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			margin: 0;
			transform: translateY(-50%);
			padding: ${themeSizes.contentHeaderPaddingHeight} 2rem;
		}

		& > :nth-child(2n) {
			transform: translateY(-${themeSizes.contentHeaderPaddingHeight})
		}

		ul li {
			padding-bottom: 0.5rem;
			line-height: 1.5rem;
			
		}
`;

function MarkdownRenderer(markdownContent: string) {
	const processor = unified()
		.use(remarkParse) // Parse markdown
		.use(remarkGfm) // Support GitHub Flavored Markdown
		.use(remarkHtml);

	const parsed = processor.parse(markdownContent);
	const htmlString = processor.stringify(parsed);

	return (
		<div dangerouslySetInnerHTML={{ __html: htmlString }} css={container} />
	);
}

export default MarkdownRenderer;
