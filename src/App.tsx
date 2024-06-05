import { useEffect, useState } from "react";
import { ThemeProvider } from "@emotion/react";
import Theme from "./utilities/Theme.ts";
import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer.tsx";
import Settings from "./components/Settings.tsx";
import { CurrentThemeProvider } from "./utilities/CurrentThemeProvider";
import { usePageSources } from "./utilities/ContentPageContext.tsx";
import { useInitialized } from "./utilities/InitializedContext.tsx";

function App() {
	const [showSettings, setShowSettings] = useState(false);
	const { setPageSources } = usePageSources();
	const { initialized, setInitialized } = useInitialized();

	useEffect(() => {
		if (!initialized) {
			const settingsString = localStorage.getItem("settings") ?? "";
			console.log(settingsString);
			try {
				const settings = JSON.parse(settingsString ?? "");

				if (settings.pages) {
					const pageSources = settings.pages;
					setPageSources(pageSources);
				}
			} catch (error) {}

			setInitialized(true);
		}
	});

	return (
		<CurrentThemeProvider>
			<ThemeProvider theme={Theme}>
				<Header />
				<Content />

				<Settings
					showSettings={showSettings}
					setShowSettings={setShowSettings}
				/>
				<Footer showSettings={showSettings} setShowSettings={setShowSettings} />
			</ThemeProvider>
		</CurrentThemeProvider>
	);
}

export default App;
