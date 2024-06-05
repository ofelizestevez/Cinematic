import { SerializedStyles, css } from "@emotion/react";
import { ReactNode, useEffect, useRef } from "react";

interface props {
	children?: ReactNode;
	styles?: SerializedStyles;

}

function SettingsPage({ children, styles }: props) {
	const ref = useRef(null);

	const style = css`
		height: calc(100vh - 10vh - (5rem * 2));
		width: calc(100% - (2rem * 2));
		margin: 5rem 2rem;
		overflow: scroll;
	`;

	return (
		<div css={[style, styles]} ref={ref}>
			{children}
		</div>
	);
}

export default SettingsPage;
