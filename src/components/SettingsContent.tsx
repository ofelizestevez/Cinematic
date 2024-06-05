import { useEffect, useRef, useState } from "react";
import ContentSettings from "./settings/ContentSettings";
import GeneralSettings from "./settings/GeneralSettings";
import ThemeSettings from "./settings/ThemeSettings";
import gsap from "gsap";
import { css } from "@emotion/react";
import { usePageSources } from "../utilities/ContentPageContext";
import { useInitialized } from "../utilities/InitializedContext";
// import { compressToBase64, decompressFromBase64 } from 'lz-string'

interface props {
	currentPage: string;
	SettingsPages: string[];
}

function SettingsContent({ currentPage, SettingsPages }: props) {
	const timelineRef = useRef(gsap.timeline());
	const { initialized } = useInitialized();
	const { pageSources } = usePageSources();

	useEffect(() => {
		if (initialized){
			const settings = {
				"pages": pageSources
			}
			const jsonSettings = JSON.stringify(settings)
			localStorage.setItem("settings", jsonSettings)
		}
	}, [pageSources])

	// Variable that reorganizes so the settings pages so that the current page is first
	// * For Animation Purposes
	const currentPages = [
		...SettingsPages.filter((item) => !currentPage.includes(item)),
		currentPage,
	];

	const style = css`
		position: relative;
	`;
	return (
		<div css={style}>
			{currentPages.map((settingsPage) => {
				if (settingsPage == "content") {
					return (
						<ContentSettings
							currentlyShown={currentPage == "content"}
							timelineRef={timelineRef}
							key={settingsPage}
						/>
					);
				} else if (settingsPage == "theme") {
					return (
						<ThemeSettings
							currentlyShown={currentPage == "theme"}
							timelineRef={timelineRef}
							key={settingsPage}
						/>
					);
				} else if (settingsPage == "general") {
					return (
						<GeneralSettings
							currentlyShown={currentPage == "general"}
							timelineRef={timelineRef}
							key={settingsPage}
						/>
					);
				}
			})}
		</div>
	);
}

export default SettingsContent;
