import { css } from "@emotion/react";
import { useContentPages } from "../context/ContentPageContext";
import Button from "./basic/Button";
import { useCurrentContentPage } from "../context/CurrentContentPageContext";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const style = css`
	display: flex;
	gap: 1rem;
`;

function ContentPageIndicator() {
	const { contentPages } = useContentPages();
	const { currentContentPage, setCurrentContentPage } = useCurrentContentPage();
	const { theme } = useTheme();

	return (
		<div css={style}>
			{contentPages.map((page) => {
				const isActive =
					currentContentPage && page.id === currentContentPage.id;

				return (
					<motion.div
						key={page.id}
						animate={
							{
								"--contentHeaderBgColor": isActive
									? theme.contentFgColor
									: theme.contentHeaderBgColor,
								"--contentFgColor": isActive
									? theme.contentHeaderBgColor
									: theme.contentFgColor,
							} as any
						}
					>
						<Button
							onClick={() => {
								setCurrentContentPage(page);
							}}
						>
							{page.title}
						</Button>
					</motion.div>
				);
			})}
		</div>
	);
}

export default ContentPageIndicator;
