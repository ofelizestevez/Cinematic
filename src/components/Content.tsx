import { css } from "@emotion/react";
import { SetStateAction, useEffect, useState } from "react";
import { usePageSources } from "../hooks/ContentPageContext";
import { pageToProvider } from "../utilities/Provider";
import MarkdownRenderer from "../utilities/MarkdownRenderer";
import { ThemeVariables, themeSizes } from "../utilities/Theme";
import { Providers } from "../utilities/providers/_main";
import { PageData } from "../utilities/interfaces";
import ContentPageIndicator from "./ContentPageIndicator";
import { usePageData } from "../hooks/ContentPageDataContext";

const styles = css`
	width: 100%;
	height: calc(100vh - ${themeSizes.headerHeight});
	color: var(${ThemeVariables.contentFgColor});

	* {
		color: var(${ThemeVariables.contentFgColor});
	}
`;

function Content() {
	// const [content, setContent] = useState<null | ReactNode>(null);

	return (
		<section css={styles}>
			{/* {content !== null ? pageSources[0].content.data : <></>} */}
			
		</section>
	);
}

export default Content;
