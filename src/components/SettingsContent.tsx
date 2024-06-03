import ContentSettings from "./settings/ContentSettings";
import GeneralSettings from "./settings/GeneralSettings";
import ThemeSettings from "./settings/ThemeSettings";

interface props {
	currentPage: string;
	currentPages: string[];
}

function SettingsContent({ currentPage, currentPages }: props) {
	return (
		<div>
			{currentPages.map((settingsPage) => {
				if (settingsPage == "content") {
					return <ContentSettings currentlyShown={currentPage == "content"} />;
				} else if (settingsPage == "theme") {
					return <ThemeSettings currentlyShown={currentPage == "theme"} />;
				} else if (settingsPage == "general") {
					return <GeneralSettings currentlyShown={currentPage == "general"} />;
				}
			})}
		</div>
	);
}

export default SettingsContent;
