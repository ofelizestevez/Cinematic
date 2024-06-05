import { css, useTheme } from "@emotion/react";
import { ReactNode, useEffect, useState } from "react";
import { usePageSources } from "../utilities/ContentPageContext";
import { Providers } from "../providers/_main";
import { pageToProvider } from "../utilities/Helpers";
import MarkdownRenderer from "../utilities/MarkdownRenderer";

function Content() {
	const theme = useTheme();
	const { pageSources, setPageSources } = usePageSources();
	const [content, setContent] = useState<null | ReactNode>(null);

	useEffect(() => {

		pageSources.forEach((page) => {
			const provider = pageToProvider(page);


			if (provider && provider.constructor.name === Providers.WEBDAV) {
				console.log(page.content.data)
				if(!(page.content.data)){
					provider.load().then((data) => {
						const newPage = pageSources.find((item) => {return item.id == page.id})!
						newPage.content.data = MarkdownRenderer(data)
						setPageSources([...pageSources, newPage])
					});
				}

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

	return <section css={styles}>{content !== null ? pageSources[0].content.data : <></>}</section>;
}

export default Content;
