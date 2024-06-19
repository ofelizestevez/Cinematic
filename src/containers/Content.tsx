import { css } from "@emotion/react";
import { useCurrentContentPage } from "../context/CurrentContentPageContext";
import { motion, AnimatePresence } from "framer-motion";

const style = css`
	flex-grow: 1;
`;

const Content = () => {
	const { currentContentPage } = useCurrentContentPage();

	return (
		<AnimatePresence mode="wait">
			<motion.section
				key={currentContentPage ? currentContentPage.id : "empty"}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				css={style}
			>
				{JSON.stringify(currentContentPage)}
			</motion.section>
		</AnimatePresence>
	);
};

export default Content;
