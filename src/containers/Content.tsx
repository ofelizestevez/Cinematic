import { css } from "@emotion/react";
import { useCurrentContentPage } from "../context/CurrentContentPageContext";
import { motion, AnimatePresence } from "framer-motion";
import { useEditingContent } from "../context/EditingContentContext";
import ContentEditor from "../components/ContentEditor";
import ContentView from "../components/ContentView";
import { useEffect, useState } from "react";
import { ContentPageData, PageSourceToContent } from "../utilities/ContentPage";

const style = css`
	flex-grow: 1;
	overflow: scroll;
`;

const Content = () => {
	const { currentContentPage } = useCurrentContentPage();
	const { isEditingContent } = useEditingContent();
	const animationKey = `${isEditingContent ? "editing" : "viewing"}-${currentContentPage?.id}`;
	const [pageData, setPageData] = useState<ContentPageData>()

	useEffect(() => {
		const fetchData = async () => {
			if (currentContentPage){
				const contentPromise = PageSourceToContent(currentContentPage?.content, "content")
				const stylePromise = PageSourceToContent(currentContentPage?.style, "style")
				const [content, style] = await Promise.all([contentPromise, stylePromise]);
				setPageData({
					id: currentContentPage.id,
					title: currentContentPage.title,
					style: style ?? "",
					content: content ?? ""
				})
			}
		}

		fetchData()
	}, [currentContentPage])

	useEffect(() => {
		console.log(pageData)
	})
	return (
		<AnimatePresence mode="wait">
			<motion.section
				key={animationKey}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				css={style}
			>
				{isEditingContent ? (
					<ContentEditor key="content-editor" />
				) : (
					<ContentView key="content-view" pageData={pageData} />
				)}
			</motion.section>
		</AnimatePresence>
	);
};

export default Content;
