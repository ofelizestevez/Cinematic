import { css } from "@emotion/react";
import SettingsButton from "./buttons/SettingsButton";

interface props {
	showSettings: boolean;
	setShowSettings: React.Dispatch<React.SetStateAction<boolean>>;
}

function Footer({ showSettings, setShowSettings }: props) {
	const styles = css`
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;

		width: calc(100% - (1rem * 2));
		position: absolute;
		bottom: 0;
		margin: 1rem;
	`;

	const left = css`
		display: flex;
		gap: 1rem;
	`;
	const center = css`
		display: flex;
		justify-content: center;
		gap: 1rem;
	`;
	const right = css`
		display: flex;
		justify-content: end;
		gap: 1rem;
	`;

	return (
		<footer css={styles}>
			<div css={left}></div>
			<div css={center}></div>
			<div css={right}>
				<SettingsButton
					showSettings={showSettings}
					setShowSettings={setShowSettings}
				/>
			</div>
		</footer>
	);
}

export default Footer;
