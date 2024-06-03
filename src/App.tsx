import { ThemeProvider} from "@emotion/react";
import Theme from "./utilities/Theme.ts";
import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer.tsx";
import Settings from "./components/Settings.tsx";
import { CurrentThemeProvider } from "./utilities/CurrentThemeProvider";
import { useState } from "react";

function App() {
	const [showSettings, setShowSettings] = useState(false)

	return (
		<CurrentThemeProvider>
			<ThemeProvider theme={Theme}>
				<Header />
				<Content />
				<Settings showSettings={showSettings} setShowSettings={setShowSettings}/>
				<Footer showSettings={showSettings} setShowSettings={setShowSettings}/>
			</ThemeProvider>
		</CurrentThemeProvider>
	);
}

export default App;
