import { ThemeProvider } from "./Utilities/ThemeProvider";
import Header from "./View/Header";

function App() {
	return (
		<>
			<ThemeProvider>
				<Header></Header>
			</ThemeProvider>
		</>
	);
}

export default App;
