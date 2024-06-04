import { ReactSortable } from "react-sortablejs";
import SettingsPage from "../SettingsPage";
import { usePageSources } from "../../utilities/ContentPageContext";
import Button from "../Button";
import { css } from "@emotion/react";
import Input from "../Input";
import { MouseEventHandler, useState } from "react";
import { Page } from "../../utilities/interfaces";
import ContentPageSettings from "./ContentPageSettings";

interface props {
	currentlyShown: boolean;
	timelineRef: React.MutableRefObject<gsap.core.Timeline>;
}

const subpages = ["main", "pageSettings"];

function ContentSettings({ currentlyShown, timelineRef }: props) {
	const [currentlyShowing, setCurrentlyShowing] = useState("main");
	const { pageSources, setPageSources } = usePageSources();
	const [currentContentPage, setCurrentContentPage] = useState<Page | null>(
		null
	);

	const currentPages = [
		...subpages.filter((item) => !currentlyShowing.includes(item)),
		currentlyShowing,
	];

	const itemCss = css`
		/* margin-bottom: 2rem; */
		padding: 1rem;
	`;

	const contentCss = css`
		margin: 1rem 0;
	`;

	const handleAddClick = () => {
		setPageSources([
			...pageSources,
			{
				id: (pageSources.slice(-1)[0]?.id ?? 0) + 1,
				title: "Untitled",
				content: {
					type: "none",
					source: "",
				},
				style: {
					type: "none",
					source: "",
				},
			},
		]);
	};

	const handlePageEditButton: MouseEventHandler = (e) => {
		const target = e.target as HTMLElement;
		const pageId = target.getAttribute("data-id") ?? 0;
		const selectedPage =
			pageSources.find((item) => item.id == pageId) ?? pageSources[0];

		setCurrentContentPage(selectedPage);
		setCurrentlyShowing("pageSettings");
	};

	return (
		<div>
			{currentPages.map((page) => {
				if (page == "main") {
					return (
						<SettingsPage
							currentlyShown={currentlyShown && currentlyShowing == "main"}
							timelineRef={timelineRef}
						>
							<h1>Content</h1>
							<ReactSortable
								list={pageSources}
								setList={setPageSources}
								css={contentCss}
							>
								{pageSources.map((source) => (
									<div key={source.id} css={itemCss}>
										<p>{source.title}</p>
										<Input>
											<button
												data-id={source.id}
												onClick={handlePageEditButton}
											>
												test
											</button>
										</Input>
									</div>
								))}
							</ReactSortable>

							<Button onClick={handleAddClick}>
								<p>Add Source</p>
							</Button>
						</SettingsPage>
					);
				} else if (page == "pageSettings") {
					return (
						<ContentPageSettings
							page={currentContentPage ?? pageSources[0]}
							currentlyShown={currentlyShowing == "pageSettings"}
							setCurrentlyShowing={setCurrentlyShowing}
							timelineRef={timelineRef}
						></ContentPageSettings>
					);
				}
			})}
		</div>
	);
}

export default ContentSettings;
