import SettingsPage from "../SettingsPage";

interface props {
	currentlyShown: boolean;
	timelineRef: React.MutableRefObject<gsap.core.Timeline>;
}

function ThemeSettings({ currentlyShown, timelineRef }: props) {
	return (
		<SettingsPage currentlyShown={currentlyShown} timelineRef={timelineRef}>
			<h1>Theme</h1>
			{/* 
                Radio ("Dark/Light based off image")
                Radio ("Dark")
                Radio ("Light")
                Radio ("Custom")

                If radio, it will show the rest of the inputs
            */}
		</SettingsPage>
	);
}

export default ThemeSettings;
