// * Imports
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer.tsx";
import SettingsOverlay from "./components/SettingsOverlay.tsx";

import { useInitialized } from "./utilities/InitializedContext.tsx";
import { Theme , themeToObject} from "./utilities/Theme.ts";

import { useTheme } from "./hooks/useTheme.ts";
import { useSettings } from "./hooks/useSettings.ts";
import { useLoadSettings } from "./hooks/useLoadSettings.ts";

// * Component
function App() {
	// * Contexts and Hooks
	const { initialized } = useInitialized();
	const [theme, setTheme] = useTheme(Theme.LIGHT);
	const { showSettings, openSettings, closeSettings, settingsRef } = useSettings();

	// * Animates Theme
	useGSAP(() => {
		if (initialized) {
			const themeVariableValues = themeToObject(theme);
			gsap.to(":root", themeVariableValues);
		}
	}, [theme]);

	// * Loads Settings Hook
	useLoadSettings()

	return (
		<>
			<Header setTheme={setTheme} />
			<Content />
			{showSettings && <SettingsOverlay closeSettings={closeSettings} settingsRef={settingsRef} />}
			<Footer openSettings={openSettings} />
		</>
	);
}

export default App;