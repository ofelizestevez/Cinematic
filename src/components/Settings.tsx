import { css, useTheme } from "@emotion/react";
import CloseIcon from "../assets/CloseIcon";
import Button from "./Button";
import { MouseEventHandler, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ContentSettings from "./settings/ContentSettings";
import ThemeSettings from "./settings/ThemeSettings";
import GeneralSettings from "./settings/GeneralSettings";

interface props {
	showSettings: boolean;
	setShowSettings: React.Dispatch<React.SetStateAction<boolean>>;
}

const SettingsPages = ["content", "theme", "general"];

type SettingsPagesType = (typeof SettingsPages)[number];

function Settings({ showSettings, setShowSettings }: props) {
	const ref = useRef(null);

	const theme = useTheme();
	const [currentPage, setCurrentPage] = useState<SettingsPagesType>("content");
	const currentPages = [currentPage, ...SettingsPages.filter(item => !currentPage.includes(item))]

	useEffect(() => {
		if (showSettings) {
			gsap.fromTo(ref.current, { opacity: 0 }, { display: "flex", opacity: 1 });
		} else {
			gsap.to(ref.current, { display: "none", opacity: 0 });
		}
	}, [showSettings]);

	const container = css`
		display: none;
		opacity: 0;
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		z-index: 1;
		justify-content: center;
		align-items: center;
		backdrop-filter: blur(8px);
	`;

	const page = css`
		position: relative;
		height: 90%;
		width: 90%;
		background-color: var(${theme.names.contentBgColor});
		border-radius: 8px;
		display: grid;
		grid-template-columns: 1fr 3fr;
	`;

	const sideBar = css`
		background-color: var(${theme.names.contentHeaderBgColor});
		border-start-start-radius: 8px;
		border-end-start-radius: 8px;
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 1rem;
	`;

	const closeIcon = css`
		position: absolute;
		top: 16px;
		right: 16px;
	`;

	const sideBarButton = css`
		background-color: unset;
		font-size: 1.25rem;
		text-transform: capitalize;
	`;

	const currentPageCSS = css`
		font-weight: bold;
	`

	const handleCloseButton = () => {
		setShowSettings(!showSettings);
	};

	const setSettingsPage: MouseEventHandler<HTMLButtonElement> = (e) => {
		// setCurrentPage()
		setCurrentPage(
			(e.target as HTMLButtonElement).getAttribute("data-page") ?? "content"
		);
	};

	return (
		<div css={container} ref={ref}>
			<div css={page}>
				<div css={sideBar}>
					{SettingsPages.map((settingsPage) => (
						<button
							css={sideBarButton}
							data-page={settingsPage}
							onClick={setSettingsPage}
						>
							{settingsPage}
						</button>
					))}
				</div>
				<div>
					{currentPages.map((settingsPage) => {
						if (settingsPage == "content") {
							return (
								<ContentSettings
									currentlyShown={currentPage == "content"}
								/>
							);
						}
						else if (settingsPage == "theme"){
							return (
								<ThemeSettings
									currentlyShown={currentPage == "theme"}
								/>
							);
						}
						else if (settingsPage == "general"){
							return (
								<GeneralSettings
									currentlyShown={currentPage == "general"}
								/>
							);
						}
					})}
				</div>
				<div css={closeIcon}>
					<Button onClick={handleCloseButton}>
						<CloseIcon color={`var(${theme.names.contentFgColor})`} />
					</Button>
				</div>
			</div>
		</div>
	);
}

export default Settings;
