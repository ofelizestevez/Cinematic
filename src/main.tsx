import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ContentPageProvider } from "./utilities/ContentPageContext.tsx";
import { InitializedProvider } from "./utilities/InitializedContext.tsx";

const rootElement = document.getElementById("root");
if (rootElement) {
	ReactDOM.createRoot(rootElement).render(
		<InitializedProvider>
			<ContentPageProvider>
				<App />
			</ContentPageProvider>
		</InitializedProvider>
	);
} else {
	console.error("Root element not found");
}
