import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ContentPageProvider } from "./utilities/ContentPageContext.tsx";
import { InitializedProvider } from "./utilities/InitializedContext.tsx";
import { CurrentThemeProvider } from "./utilities/CurrentThemeProvider.tsx";
import { ThemeProvider } from "@emotion/react";
import Theme from "./utilities/Theme.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<InitializedProvider>
		<ContentPageProvider>
			<CurrentThemeProvider>
				<ThemeProvider theme={Theme}>
					<App />
				</ThemeProvider>
			</CurrentThemeProvider>
		</ContentPageProvider>
	</InitializedProvider>
);
