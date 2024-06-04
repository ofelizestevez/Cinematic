import SettingsPage from "../SettingsPage";

interface props {
	currentlyShown: boolean;
	timelineRef: React.MutableRefObject<gsap.core.Timeline>;
}

function GeneralSettings({ currentlyShown, timelineRef }: props) {
	return (
		<SettingsPage currentlyShown={currentlyShown} timelineRef={timelineRef}>
			<h1>General</h1>
		</SettingsPage>
	);
}

export default GeneralSettings;
