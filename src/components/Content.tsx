import { css } from "@emotion/react";
import { ThemeVariables, themeSizes } from "../utilities/Theme";
import { usePageData } from "../hooks/ContentPageDataContext";
import { ReactNode, useEffect, useRef, useState } from "react";
import MarkdownRenderer from "../utilities/MarkdownRenderer";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { PageData } from "../utilities/interfaces";

const styles = css`
	width: 100%;
	height: calc(100vh - ${themeSizes.headerHeight} - 6rem);
	color: var(${ThemeVariables.contentFgColor});
	display: flex;
	margin-top: 0.75rem;
	justify-content: center;
	* {
		color: var(${ThemeVariables.contentFgColor});
	}
`;

const tableStyle = css``;

const defaultStyle = css``;

function Content() {
	const { currentPageData } = usePageData();
	const [previousPageData, setPreviousPageData] = useState<PageData | null>(
		null
	);
	const [renderedPage, setRenderedPage] = useState<ReactNode>(null);
	const ref = useRef(null);

	useGSAP(() => {
		if (!previousPageData) {
			setPreviousPageData(currentPageData);
		} else if (currentPageData !== previousPageData) {
			gsap.to(ref.current, {
				opacity: 0,
				duration: 0.25,
				onComplete: () => {
					setPreviousPageData(currentPageData);
				},
			});
		} else {
			gsap.fromTo(
				ref.current,
				{ opacity: 0, duration: 0.25 },
				{ opacity: 1, duration: 0.25 }
			);
		}
	}, [currentPageData, previousPageData]);

	useEffect(() => {
		// Set the rendered page based on currentPageData
		if (previousPageData) {
			setRenderedPage(MarkdownRenderer(previousPageData.content));
		} else {
			setRenderedPage(null);
		}
	}, [previousPageData]);

	return (
		<section css={styles} ref={ref}>
			<div>{renderedPage}</div>
		</section>
	);
}

export default Content;
