import { css } from "@emotion/react";
import { MouseEventHandler, ReactNode, useState } from "react";
import SettingsSidebar from "./SettingsSidebar";
import SettingsContent from "./SettingsContent";
import { ThemeVariables } from "../utilities/Theme";

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

const page = css`
		position: relative;
		height: 90%;
		width: 90%;
		background-color: var(${ThemeVariables.contentBgColor});
		color: var(${ThemeVariables.contentFgColor});
		border-radius: 8px;
		display: grid;
		grid-template-columns: 1fr 3fr;
	`;

function Settings({ children }: props) {

	const [currentPage, setCurrentPage] = useState<SettingsPage>(
		SettingsPage.GENERAL
	);

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
