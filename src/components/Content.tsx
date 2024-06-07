import { css } from "@emotion/react";
import { SetStateAction, useEffect, useState } from "react";
import { usePageSources } from "../utilities/ContentPageContext";
import { pageToProvider } from "../utilities/Provider";
import MarkdownRenderer from "../utilities/MarkdownRenderer";
import { ThemeVariables, themeSizes } from "../utilities/Theme";
import { Providers } from "../utilities/providers/_main";
import { PageData } from "../utilities/interfaces";
import ContentPageIndicator from "./ContentPageIndicator";
import { usePageData } from "../utilities/ContentPageDataContext";

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
	const {pageData, setPageData} = usePageData()
	// const [content, setContent] = useState<null | ReactNode>(null);

	useEffect(() => {
		Promise.all(pageSources.map(async (page) => {
			if (!pageData.find((item) => page.id === item.id)) {
				const content = await (async () => {
					const provider = pageToProvider(page.content);
					let providerData = <></>;
	
					if (provider && provider.constructor.name === Providers.WEBDAV) {
						const data = await provider.load();
						const element = MarkdownRenderer(data);
						providerData = element;
					}
	
					return providerData;
				})();
	
				return {
					id: page.id,
					title: page.title,
					style: "",
					content: content
				};
			}
		}))
		.then((newPageData) => {
			const filteredNewPageData = newPageData.filter(data => data); // Filter out undefined values
			setPageData(prevPageData => [...prevPageData, ...filteredNewPageData].filter(data => data) as PageData[]);
		});
	}, [pageSources]);

	return (
		<section css={styles}>
			{/* {content !== null ? pageSources[0].content.data : <></>} */}
			
		</section>
	);
}

export default Content;
