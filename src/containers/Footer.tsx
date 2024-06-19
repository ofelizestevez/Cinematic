import { css } from "@emotion/react";
import SettingsButton from "../components/SettingsButton";
import ContentPageIndicator from "../components/ContentPageIndicator";
import EditButton from "../components/EditButton";

const style = css`
	display: grid;
	grid-template-columns: 1fr auto 1fr;

	width: 100%;
	padding: 1rem;
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

const Footer = () => {
	return <footer css={style}>
        <div css={left}>a</div>
        <div css={center}>
			<ContentPageIndicator />
		</div>
        <div css={right}>
			<EditButton />
			<SettingsButton />
		</div>
    </footer>;
};

export default Footer;
