import { css } from "@emotion/react";
import Content from "./containers/Content";
import Footer from "./containers/Footer";
import Header from "./containers/Header";
import Settings from "./containers/Settings";

const style = css`
	display: flex;
	height: 100vh;
    flex-direction: column;
`;

function App() {
	return (
		<div css={style}>
			<Header />
			<Content />
			<Settings />
			<Footer />
		</div>
	);
}

export default App;
