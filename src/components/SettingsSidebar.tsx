import { css } from "@emotion/react";
import { ThemeVariables } from "../utilities/Theme";
import { SettingsPage } from "../containers/Settings";

interface props {
	currentPage: SettingsPage;
	setCurrentPage: React.Dispatch<React.SetStateAction<SettingsPage>>;
}

const style = css`
	background-color: var(${ThemeVariables.contentHeaderBgColor});
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
	color: var(${ThemeVariables.contentFgColor});
`;

const current = css`
	font-weight: bold;
`;

function SettingsSidebar({ currentPage, setCurrentPage }: props) {
	return (
		<div css={style}>
			{Object.values(SettingsPage).map((settingsPage) => (
				<button
					css={[button, currentPage == settingsPage ? current : ""]}
					onClick={() => {
                        setCurrentPage(settingsPage)
                    }}
					key={`${settingsPage}-sidebar`}
				>
					{settingsPage}
				</button>
			))}
		</div>
	);
}

export default SettingsSidebar;