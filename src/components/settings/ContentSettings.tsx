import { css } from "@emotion/react";
import { useContentPages } from "../../context/ContentPageContext";
import { Providers } from "../../utilities/providers/_main";
import SettingsPage from "../SettingsPage";
import Button from "../basic/Button";
import { ReactSortable } from "react-sortablejs";
import { ContentPage } from "../../utilities/ContentPage";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import ContentPageSettings from "./ContentPageSettings";
import LeftArrowIcon from "../../assets/LeftArrowIcon";
import { ThemeVariables } from "../../utilities/Theme";

const itemCss = css`
	display: flex;
	align-items: center;
	gap: 1rem;
	padding: 1rem;
`;

const backButtonCss = css`
	position: absolute;
	left: 16px;
	top: 16px;
`;

function ContentSettings() {
	const { contentPages, setContentPages } = useContentPages();
	const [currentContentPage, setCurrentContentPage] =
		useState<ContentPage | null>(null);

	const handleAddClick = () => {
		setContentPages([
			...contentPages,
			{
				id: (contentPages.slice(-1)[0]?.id ?? 0) + 1,
				title: "Untitled",
				content: {
					type: Providers.NONE,
					source: "",
					saveEnabled: false,
				},
				style: {
					type: Providers.NONE,
					source: "",
					saveEnabled: false,
				},
			},
		]);
	};

	const handleEditClick = (page: ContentPage) => {
		setCurrentContentPage(page);
	};

	const handleDeleteClick = (page: ContentPage) => {
		const newContentPages = contentPages.filter((item) => item.id !== page.id);
		setContentPages(newContentPages);
	};

	const handleBackClick = () => {
		setCurrentContentPage(null);
	};

	const handleSaveClick = (page: ContentPage) => {
		const newContentPages = contentPages.map((contentPage) =>
			contentPage.id === page.id ? page : contentPage
		);

		setContentPages(newContentPages);
		setCurrentContentPage(null);
	};

	return (
		<AnimatePresence mode="wait">
			{currentContentPage ? (
				<motion.div
					key="page-settings"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				>
					<ContentPageSettings page={currentContentPage} save={handleSaveClick}>
						<Button onClick={handleBackClick} css={backButtonCss}>
							<LeftArrowIcon color={`var(${ThemeVariables.contentFgColor})`} />
						</Button>
					</ContentPageSettings>
				</motion.div>
			) : (
				<motion.div
					key="main-settings"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				>
					<SettingsPage>
						<h1>Content Settings</h1>
						<ReactSortable list={contentPages} setList={setContentPages}>
							<AnimatePresence>
								{contentPages.map((page) => (
									<motion.div
										key={page.id}
										css={itemCss}
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										transition={{ duration: 0.5 }}
									>
										<p>{page.title}</p>
										<Button onClick={() => handleEditClick(page)}>
											Edit Page
										</Button>
										<Button onClick={() => handleDeleteClick(page)}>
											Delete Page
										</Button>
									</motion.div>
								))}
							</AnimatePresence>
						</ReactSortable>
						<Button onClick={handleAddClick}>Add Source</Button>
					</SettingsPage>
				</motion.div>
			)}
		</AnimatePresence>
	);
}

export default ContentSettings;
