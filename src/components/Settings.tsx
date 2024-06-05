import { css, useTheme } from "@emotion/react";
import { MouseEventHandler, ReactNode, useState } from "react";
import SettingsSidebar from "./SettingsSidebar";
import SettingsContent from "./SettingsContent";

export enum SettingsPage {
	GENERAL = "General",
	CONTENT = "Content",
	THEME = "Theme",
}
export const SettingsPages = ["general", "content", "theme"];

export type SettingsPagesType = (typeof SettingsPages)[number];

interface props {
	children?: ReactNode;
}
function Settings({ children }: props) {
	const theme = useTheme();

	const [currentPage, setCurrentPage] = useState<SettingsPage>(
		SettingsPage.GENERAL
	);

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

	const setSettingsPage: MouseEventHandler<HTMLButtonElement> = (e) => {
		const target = e.currentTarget as HTMLButtonElement;
		const pageAttr = target.getAttribute("data-page") as SettingsPage | null;
	
		if (pageAttr) {
			setCurrentPage(pageAttr);
		}
	};

	return (
		<div css={page}>
			<SettingsSidebar
				currentPage={currentPage}
				setSettingsPage={setSettingsPage}
			/>
			<SettingsContent currentPage={currentPage} />
			{children}
		</div>
	);
}

export default Settings;
