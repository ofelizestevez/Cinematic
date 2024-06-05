import { useEffect, useRef, useState } from "react";
import { ThemeProvider, css, useTheme } from "@emotion/react";
import Theme from "./utilities/Theme.ts";
import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer.tsx";
import Settings from "./components/Settings.tsx";
import { CurrentThemeProvider } from "./utilities/CurrentThemeProvider";
import { usePageSources } from "./utilities/ContentPageContext.tsx";
import { useInitialized } from "./utilities/InitializedContext.tsx";
import Overlay from "./components/Overlay.tsx";
import CloseIcon from "./assets/CloseIcon.tsx";
import Button from "./components/Button.tsx";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function App() {
	const theme = useTheme();
	const [showSettings, setShowSettings] = useState(false);
	const { setPageSources } = usePageSources();
	const { initialized, setInitialized } = useInitialized();

	const settingsRef = useRef(null)

	const closeIcon = css`
		position: absolute;
		top: 16px;
		right: 16px;
	`;

	const openSettings = () => {
		setShowSettings(true)		
	};

	const closeSettings = () => {
		gsap.to(settingsRef.current, {display: "none", opacity: 0})
		.then(() => {
			setShowSettings(false)

		})
	};
	
	useGSAP(() => {
		if (showSettings){
			gsap.to(settingsRef.current, {display: "block", opacity: 1})
		}
	}, {dependencies: [showSettings]})

	useEffect(() => {
		console.log("YEO");
		if (!initialized) {
			const settingsString = localStorage.getItem("settings") ?? "";
			console.log(settingsString);
			try {
				const settings = JSON.parse(settingsString ?? "");

				if (settings.pages) {
					const pageSources = settings.pages;
					setPageSources(pageSources);
				}
			} catch (error) {}

			setInitialized(true);
		}
	});

	return (
		<>
			<Header />
			<Content />

			{showSettings && (
				<div style={{display: "none", opacity: 0}} ref={settingsRef}>
					<Overlay>
						<Settings>
							<div css={closeIcon}>
								<Button onClick={closeSettings}>
									<CloseIcon color={`var(${theme.names.contentFgColor})`} />
								</Button>
							</div>
						</Settings>
					</Overlay>
				</div>
			)}

			<Footer openSettings={openSettings} />
		</>
	);
}

export default App;
