import { css, useTheme } from "@emotion/react";
import { MouseEventHandler, ReactNode, useState } from "react";
import SettingsSidebar from "./SettingsSidebar";
import SettingsContent from "./SettingsContent";

export const SettingsPages = ["general", "content", "theme"];

export type SettingsPagesType = (typeof SettingsPages)[number];

interface props {
    children? : ReactNode
}
function Settings({children} : props) {
	const theme = useTheme();

	const [currentPage, setCurrentPage] = useState<SettingsPagesType>("general");

	const container = css`
		/* display: none; */
		/* opacity: 0; */
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

	const setSettingsPage: MouseEventHandler<HTMLButtonElement> = (e) => {
		setCurrentPage(
			(e.target as HTMLButtonElement).getAttribute("data-page") ?? "content"
		);
	};

	return (
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
			{children}
		</div>
	);
}

export default Settings;
