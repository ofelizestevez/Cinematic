import { ReactSortable } from "react-sortablejs";
import SettingsPage from "../SettingsPage";
import { usePageSources } from "../../utilities/ContentPageContext";
import Button from "../Button";
import { css, useTheme } from "@emotion/react";
import { MouseEventHandler, useRef, useState } from "react";
import { Page } from "../../utilities/interfaces";
import ContentPageSettings from "./ContentPageSettings";
import { Providers } from "../../providers/_main";
import LeftArrowIcon from "../../assets/LeftArrowIcon";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface props {
	currentlyShown: boolean;
	timelineRef: React.MutableRefObject<gsap.core.Timeline>;
}

const subpages = ["main", "pageSettings"];

function ContentSettings({ currentlyShown, timelineRef }: props) {
	const theme = useTheme();

	const [currentlyShowing, setCurrentlyShowing] = useState("main");
	const { pageSources, setPageSources } = usePageSources();
	const [currentContentPage, setCurrentContentPage] = useState<Page | null>(
		null
	);

	const backButtonRef = useRef(null);

	useGSAP(() => {
		if (currentlyShowing == "main") {
			gsap.to(backButtonRef.current, { opacity: 0 });
		} else {
			gsap.to(backButtonRef.current, { opacity: 1 });
		}
	}, [currentlyShowing]);
	const backIcon = css`
		position: absolute;
		top: 16px;
		left: 16px;
	`;

	const currentPages = [
		...subpages.filter((item) => !currentlyShowing.includes(item)),
		currentlyShowing,
	];

	const itemCss = css`
		display: flex;
		align-items: center;
		gap: 1rem;
		/* margin-bottom: 2rem; */
		padding: 1rem;
	`;

	const contentCss = css`
		margin: 1rem 0;
	`;

	const savePage = (page: Page) => {
		const newPageSources = pageSources;
		newPageSources[pageSources.indexOf(currentContentPage!)] = page;

		setPageSources(newPageSources);
		setCurrentContentPage(null);
		setCurrentlyShowing("main");
	};

	const handleBackButton = () => {
		setCurrentlyShowing("main");
		setCurrentContentPage(null);
	};

	const handleAddClick = () => {
		setPageSources([
			...pageSources,
			{
				id: (pageSources.slice(-1)[0]?.id ?? 0) + 1,
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

	const handlePageEditButton: MouseEventHandler = (e) => {
		const target = e.target as HTMLElement;
		const pageId = target.getAttribute("data-id") ?? 0;
		const selectedPage =
			pageSources.find((item) => item.id == pageId) ?? pageSources[0];

		setCurrentContentPage(selectedPage);
		setCurrentlyShowing("pageSettings");
	};

	const handlePageDeleteButton: MouseEventHandler = (e) => {
		const target = e.target as HTMLElement;
		const pageId = target.getAttribute("data-id") ?? 0;
		const selectedPage =
			pageSources.find((item) => item.id == pageId) ?? pageSources[0];

		const newPageSources = pageSources.filter((item) => {
			return item != selectedPage;
		});

		setPageSources(newPageSources);
	};

	return (
		<div>
			{currentPages.map((page) => {
				if (page == "main") {
					return (
						<SettingsPage
							currentlyShown={currentlyShown && currentlyShowing == "main"}
							timelineRef={timelineRef}
							key={"main-ContentSettings"}
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
										<Button data-id={source.id} onClick={handlePageEditButton}>
											Edit Page
										</Button>
										<Button
											data-id={source.id}
											onClick={handlePageDeleteButton}
										>
											Delete Page
										</Button>
									</div>
								))}
							</ReactSortable>

							<Button onClick={handleAddClick}>
								<p>Add Source</p>
							</Button>
						</SettingsPage>
					);
				} else if (page == "pageSettings" && currentContentPage) {
					return (
						<ContentPageSettings
							page={currentContentPage}
							setCurrentContentPage={savePage}
							currentlyShown={
								currentlyShown && currentlyShowing == "pageSettings"
							}
							timelineRef={timelineRef}
							key={"pageSettings-ContentSettings"}
						></ContentPageSettings>
					);
				}
			})}

			<div ref={backButtonRef} css={backIcon} style={{ opacity: 0 }}>
				<Button onClick={handleBackButton}>
					<LeftArrowIcon color={`var(${theme.names.contentFgColor})`} />
				</Button>
			</div>
		</div>
	);
}

export default ContentSettings;
