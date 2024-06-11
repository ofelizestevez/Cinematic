import { css } from "@emotion/react";

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
        <div css={center}>b</div>
        <div css={right}>c</div>
    </footer>;
};

export default Footer;
