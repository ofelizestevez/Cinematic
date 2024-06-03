import { ThemeProvider} from "@emotion/react";
import Theme from "./utilities/Theme.ts";
import Header from "./components/Header";
import Content from "./components/Content";
import { CurrentThemeProvider } from "./utilities/CurrentThemeProvider";
import { useState } from "react";

function App() {
	const [showSettings, setShowSettings] = useState(false)

	return (
		<CurrentThemeProvider>
			<ThemeProvider theme={Theme}>
				<Header />
				<Content />
			</ThemeProvider>
		</CurrentThemeProvider>
	);
}

export default App;
