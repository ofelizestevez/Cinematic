import { css } from "@emotion/react";
import { useEffect } from "react";
import { usePageSources } from "../utilities/ContentPageContext";
import { pageToProvider } from "../utilities/Helpers";
import MarkdownRenderer from "../utilities/MarkdownRenderer";
import { ThemeVariables, themeSizes } from "../utilities/Theme";
import { Providers } from "../providers/_main";

const styles = css`
	width: 100%;
	height: calc(100vh - ${themeSizes.headerHeight});
	color: var(${ThemeVariables.contentFgColor});

	* {
		color: var(${ThemeVariables.contentFgColor});
	}
`;

function Content() {
	const { pageSources, setPageSources } = usePageSources();
	// const [content, setContent] = useState<null | ReactNode>(null);

	useEffect(() => {
		pageSources.forEach((page) => {
			const provider = pageToProvider(page);

			if (provider && provider.constructor.name === Providers.WEBDAV) {
				console.log(page.content.data);
				if (!page.content.data) {
					provider.load().then((data) => {
						const newPage = pageSources.find((item) => {
							return item.id == page.id;
						})!;
						newPage.content.data = MarkdownRenderer(data);
						setPageSources([...pageSources, newPage]);
					});
				}
			}
			console.log();
		});
	}, [pageSources]);

	return (
		<section css={styles}>
			{/* {content !== null ? pageSources[0].content.data : <></>} */}
		</section>
	);
}

export default Content;
