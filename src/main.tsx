import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ContentPageProvider } from "./hooks/ContentPageContext.tsx";
import { PageDataProvider } from "./hooks/ContentPageDataContext.tsx";

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
