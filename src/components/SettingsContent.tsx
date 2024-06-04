import { useRef } from "react";
import ContentSettings from "./settings/ContentSettings";
import GeneralSettings from "./settings/GeneralSettings";
import ThemeSettings from "./settings/ThemeSettings";
import gsap from "gsap";

interface props {
	currentPage: string;
	SettingsPages: string[];
}

function SettingsContent({ currentPage, SettingsPages }: props) {
	const timelineRef = useRef(gsap.timeline());

	// Variable that reorganizes so the settings pages so that the current page is first
	// * For Animation Purposes
	const currentPages = [
		...SettingsPages.filter((item) => !currentPage.includes(item)),
		currentPage,
	];

	return (
		<div>
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
