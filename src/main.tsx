import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ContentPageProvider } from "./utilities/ContentPageContext.tsx";
import { PageDataProvider } from "./utilities/ContentPageDataContext.tsx";

const rootElement = document.getElementById("root");
if (rootElement) {
	ReactDOM.createRoot(rootElement).render(
		<ContentPageProvider>
			<PageDataProvider>
				<App />
			</PageDataProvider>
		</ContentPageProvider>
	);
} else {
	console.error("Root element not found");
}
