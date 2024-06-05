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

enum PAGE {
	MAIN,
	INDVPAGESETTINGS
}

function ContentSettings() {
	const theme = useTheme();
	const ref = useRef(null);
	const initializedRef = useRef(false);

	const [currentlyShowing, setCurrentlyShowing] = useState<PAGE>(PAGE.MAIN);
	const [currentContentPage, setCurrentContentPage] = useState<Page | null>(
		null
	);
	const { pageSources, setPageSources } = usePageSources();

	const backIcon = css`
		position: absolute;
		top: 16px;
		left: 16px;
	`;

	const itemCss = css`
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1rem;
	`;

	const contentCss = css`
		margin: 1rem 0;
	`;

	useGSAP(() => {
		if (initializedRef.current){
			gsap.fromTo(ref.current, {opacity: 0, duration: 0.5},{opacity: 1, duration: 0.5})
		}
		else {
			initializedRef.current = true
		}
	}, {dependencies: [currentContentPage, currentlyShowing]})

	const savePage = (page: Page) => {
		const newPageSources = pageSources;
		newPageSources[pageSources.indexOf(currentContentPage!)] = page;

		setPageSources(newPageSources);
		setCurrentContentPage(null);
		setCurrentlyShowing(PAGE.MAIN);
	};

	const handleBackButton = () => {
		setCurrentlyShowing(PAGE.MAIN);
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
		setCurrentlyShowing(PAGE.INDVPAGESETTINGS);
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
		<div ref={ref}>
			{currentlyShowing == PAGE.INDVPAGESETTINGS && currentContentPage &&  (
				<ContentPageSettings
					page={currentContentPage}
					setCurrentContentPage={savePage}
				>
					<Button css={backIcon} onClick={handleBackButton}>
						<LeftArrowIcon color={`var(${theme.names.contentFgColor})`} />
					</Button>
				</ContentPageSettings>
			)}

			{currentlyShowing == PAGE.MAIN && (
				<SettingsPage>
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
								<Button data-id={source.id} onClick={handlePageDeleteButton}>
									Delete Page
								</Button>
							</div>
						))}
					</ReactSortable>

					<Button onClick={handleAddClick}>Add Source</Button>
				</SettingsPage>
			)}
		</div>
	);
}

export default ContentSettings;
