import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { SettingsProvider } from "./context/SettingsContext.tsx";

const rootElement = document.getElementById("root");
if (rootElement) {
	ReactDOM.createRoot(rootElement).render(
		<SettingsProvider>
			<App />
		</SettingsProvider>
	);
} else {
	console.error("Root element not found");
}
