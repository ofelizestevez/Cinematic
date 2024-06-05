import { css, useTheme } from "@emotion/react";
import { ReactNode, useEffect, useState } from "react";
import { usePageSources } from "../utilities/ContentPageContext";
import { Provider, Providers } from "../providers/_main";
import { WebDav } from "../providers/WebDav";
import { pageToProvider } from "../utilities/Helpers";
import axios from "axios";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import MarkdownRenderer from "../utilities/MarkdownRenderer";

interface props {
	children?: ReactNode;
}

function Content({ children }: props) {
	const theme = useTheme();
	const { pageSources } = usePageSources();
	const [content, setContent] = useState<null | ReactNode>(null);

	useEffect(() => {
		pageSources.forEach((page) => {
			const provider = pageToProvider(page);

			if (provider && provider.constructor.name === Providers.WEBDAV) {
				provider.load().then((data) => {
					setContent(MarkdownRenderer(data));
				});
			}
			console.log();
		});
	}, [pageSources]);
	const styles = css`
		width: 100%;
		height: calc(100vh - ${theme.sizes.headerHeight});
		color: var(${theme.names.contentFgColor});

		* {
			color: var(${theme.names.contentFgColor});
		}
	`;

	return <section css={styles}>{content !== null ? content : <></>}</section>;
}

export default Content;
