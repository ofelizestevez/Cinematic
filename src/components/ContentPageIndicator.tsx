import { css } from "@emotion/react";
import { usePageData } from "../hooks/ContentPageDataContext";
import Button from "./simple/Button";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ThemeVariables } from "../utilities/Theme";
import { PageData } from "../utilities/interfaces";
import { getRootCssVar } from "../utilities/Helpers";

const style = css`
	display: flex;
	gap: 1rem;
`;

const button = css`
	height: 100%;
`;

const selected = css`
	background-color: var(${ThemeVariables.contentFgColor});
	color: var(${ThemeVariables.contentHeaderBgColor});
`;

function ContentPageIndicator() {
	const { pageData, currentPageData, setCurrentPageData } = usePageData();
	const prevPageDataLength = useRef(pageData.length);
	const parentRef = useRef<HTMLDivElement>(null);
	const timelineRef = useRef(gsap.timeline());

	useGSAP(() => {
		if (parentRef && pageData.length > prevPageDataLength.current) {
			const newElementsCount = pageData.length - prevPageDataLength.current;
			const newElements = Array.from(parentRef.current?.children ?? []).slice(
				-newElementsCount
			);

			if (parentRef.current) {
				newElements.forEach((element, index) => {
					timelineRef.current.fromTo(
						element,
						{ opacity: 0, y: 50 },
						{ opacity: 1, y: 0, duration: 0.15 }
					);
				});
			}
		}

		prevPageDataLength.current = pageData.length;
	}, [pageData, currentPageData]);

	useGSAP(() => {
		const currentBgColor = getRootCssVar(ThemeVariables.contentFgColor);
		const currentFgColor = getRootCssVar(ThemeVariables.contentHeaderBgColor);

		Array.from(parentRef.current?.children ?? []).forEach((element, index) => {
			const isSelected =
				currentPageData && currentPageData.id === pageData[index].id;

			if (isSelected) {
				timelineRef.current
					.fromTo(
						element,
						{
							color: currentBgColor,
							backgroundColor: currentFgColor,
						},
						{
							backgroundColor: currentBgColor,
							color: currentFgColor,
						}
					)
					.to(element, {
						backgroundColor: "",
						color: "",
					});
			}
		});
	}, [currentPageData]);

	const handleButtonClick = (page: PageData) => {
		setCurrentPageData(page);
	};

	return (
		<div css={style} ref={parentRef}>
			{pageData.map((page) => {
				return (
					<Button
						css={[button, currentPageData?.id == page.id ? selected : ``]}
						onClick={() => handleButtonClick(page)}
						key={`pageIndicator-${page.id}`}
					>
						{page.title}
					</Button>
				);
			})}
		</div>
	);
}

export default ContentPageIndicator;
