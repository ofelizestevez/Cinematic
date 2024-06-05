import { css, useTheme } from "@emotion/react";
import CloseIcon from "../assets/CloseIcon";
import Button from "./Button";
import { MouseEventHandler, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import SettingsSidebar from "./SettingsSidebar";
import SettingsContent from "./SettingsContent";

interface props {
	showSettings: boolean;
	setShowSettings: React.Dispatch<React.SetStateAction<boolean>>;
}

const SettingsPages = ["general", "content", "theme"];

type SettingsPagesType = (typeof SettingsPages)[number];

function Settings({ showSettings, setShowSettings }: props) {
	const ref = useRef(null);
	const theme = useTheme();

	const [currentPage, setCurrentPage] = useState<SettingsPagesType>("general");

	// If settings are shown, then display, otherwise hide
	useEffect(() => {
		
		if (showSettings) {
			gsap.fromTo(ref.current, { opacity: 0 }, { display: "flex", opacity: 1 });
		} else {
			gsap.to(ref.current, { display: "none", opacity: 0 });
		}
	}, [showSettings]);

	const container = css`
		display: none;
		opacity: 0;
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		z-index: 1;
		justify-content: center;
		align-items: center;
		backdrop-filter: blur(8px);
	`;

	const page = css`
		position: relative;
		height: 90%;
		width: 90%;
		background-color: var(${theme.names.contentBgColor});
		color: var(${theme.names.contentFgColor});
		border-radius: 8px;
		display: grid;
		grid-template-columns: 1fr 3fr;
	`;

	const closeIcon = css`
		position: absolute;
		top: 16px;
		right: 16px;
	`;

	const handleCloseButton = () => {
		setShowSettings(!showSettings);
	};

	const setSettingsPage: MouseEventHandler<HTMLButtonElement> = (e) => {
		setCurrentPage(
			(e.target as HTMLButtonElement).getAttribute("data-page") ?? "content"
		);
	};

	return (
		<div css={container} ref={ref}>
			<div css={page}>
				<SettingsSidebar
					currentPage={currentPage}
					SettingsPages={SettingsPages}
					setSettingsPage={setSettingsPage}
				/>
				<SettingsContent
					currentPage={currentPage}
					SettingsPages={SettingsPages}
				/>
				<div css={closeIcon}>
					<Button onClick={handleCloseButton}>
						<CloseIcon color={`var(${theme.names.contentFgColor})`} />
					</Button>
				</div>
			</div>
		</div>
	);
}

export default Settings;
