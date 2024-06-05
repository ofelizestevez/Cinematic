import { useEffect, useRef, useState } from "react";
import { css } from "@emotion/react";
import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer.tsx";
import Settings from "./components/Settings.tsx";
import { usePageSources } from "./utilities/ContentPageContext.tsx";
import { useInitialized } from "./utilities/InitializedContext.tsx";
import Overlay from "./components/Overlay.tsx";
import CloseIcon from "./assets/CloseIcon.tsx";
import Button from "./components/Button.tsx";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ThemeNames, ThemeVariables } from "./utilities/Theme.ts";
import { themeToObject } from "./utilities/Helpers.ts";

const closeIcon = css`
	position: absolute;
	top: 16px;
	right: 16px;
`;

function App() {
	const [showSettings, setShowSettings] = useState(false);
	const { setPageSources } = usePageSources();
	const { initialized, setInitialized } = useInitialized();
	const [theme, setTheme] = useState<ThemeNames>(localStorage.getItem("currentTheme") as  ThemeNames | null ?? ThemeNames.LIGHT)

	useGSAP(() => {
		localStorage.setItem("currentTheme", JSON.stringify(theme))

		if (initialized){
			const themeVariableValues = (themeToObject(theme))
			gsap.to(":root", themeVariableValues)
		}

		console.log(theme)
		// gsap.to(":root", {})
	}, [theme])
	
	const settingsRef = useRef(null);

	const openSettings = () => {
		setShowSettings(true);
	};

	const closeSettings = () => {
		gsap.to(settingsRef.current, { display: "none", opacity: 0 }).then(() => {
			setShowSettings(false);
		});
	};

	useGSAP(
		() => {
			if (showSettings) {
				gsap.to(settingsRef.current, { display: "block", opacity: 1 });
			}
		},
		{ dependencies: [showSettings] }
	);

	useEffect(() => {
		if (!initialized) {
			const settingsString = localStorage.getItem("settings") ?? "";
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
			<Header setTheme={setTheme}/>
			<Content />

			{showSettings && (
				<div style={{ display: "none", opacity: 0 }} ref={settingsRef}>
					<Overlay>
						<Settings>
							<div css={closeIcon}>
								<Button onClick={closeSettings}>
									<CloseIcon color={`var(${ThemeVariables.contentFgColor})`} />
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

