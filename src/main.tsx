import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ContentPageProvider } from "./utilities/ContentPageContext.tsx";
import { InitializedProvider } from "./utilities/InitializedContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<InitializedProvider>
		<ContentPageProvider>
			<App />
		</ContentPageProvider>
	</InitializedProvider>
);
