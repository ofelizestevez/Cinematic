import { css, useTheme } from "@emotion/react";
import { MouseEventHandler } from "react";

interface props {
    currentPage: string;
	SettingsPages: string[];
	setSettingsPage: MouseEventHandler<HTMLButtonElement>;
}

function SettingsSidebar({ currentPage, SettingsPages, setSettingsPage }: props) {
	const theme = useTheme();

	const style = css`
		background-color: var(${theme.names.contentHeaderBgColor});
		border-start-start-radius: 8px;
		border-end-start-radius: 8px;
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 1rem;
	`;

	const button = css`
		background-color: unset;
		font-size: 1.25rem;
		text-transform: capitalize;
	`;

	const current = css`
		font-weight: bold;
	`;

	return (
		<div css={style}>
			{SettingsPages.map((settingsPage) => (
				<button css={[button, currentPage == settingsPage ? current: ""]} data-page={settingsPage} onClick={setSettingsPage}>
					{settingsPage}
				</button>
			))}
		</div>
	);
}

export default SettingsSidebar;
