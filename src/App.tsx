import { useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer.tsx";
import SettingsOverlay from "./components/SettingsOverlay.tsx";
import { usePageSources } from "./utilities/ContentPageContext.tsx";
import { useInitialized } from "./utilities/InitializedContext.tsx";
import { Theme } from "./utilities/Theme.ts";
import { themeToObject } from "./utilities/Helpers.ts";
import { useTheme } from "./hooks/useTheme.ts";
import { useSettings } from "./hooks/useSettings.ts";

function App() {
	const { setPageSources } = usePageSources();
	const { initialized, setInitialized } = useInitialized();
	const [theme, setTheme] = useTheme(Theme.LIGHT);
	const { showSettings, openSettings, closeSettings, settingsRef } = useSettings();

	useGSAP(() => {
		if (initialized) {
			const themeVariableValues = themeToObject(theme);
			gsap.to(":root", themeVariableValues);
		}
	}, [theme]);

	useEffect(() => {
		if (!initialized) {
			const settingsString = localStorage.getItem("settings") ?? "";
			try {
				const settings = JSON.parse(settingsString ?? "");

				if (settings.pages) {
					const pageSources = settings.pages;
					setPageSources(pageSources);
				}
			} catch (error) {
				console.error("Failed to parse settings:", error);
			}

			setInitialized(true);
		}
	}, [initialized, setInitialized, setPageSources]);

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