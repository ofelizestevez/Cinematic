import { css } from "@emotion/react";
import SettingsButton from "./buttons/SettingsButton";
import ContentPageIndicator from "./ContentPageIndicator";

interface props {
	openSettings: () => void;
}

function Footer({ openSettings }: props) {
	const styles = css`
		display: grid;
		grid-template-columns: 1fr auto 1fr;

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
			<div css={center}>
			<ContentPageIndicator />
			</div>
			<div css={right}>
				<SettingsButton openSettings={openSettings} />
			</div>
		</footer>
	);
}

export default Footer;
