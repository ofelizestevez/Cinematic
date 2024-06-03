import { SerializedStyles, css } from "@emotion/react";
import { ReactNode, useEffect, useRef } from "react";
import gsap from "gsap";

interface props {
	children?: ReactNode;
	currentlyShown: boolean;
	styles?: SerializedStyles;
}

function SettingsPage({ children, currentlyShown , styles}: props) {
	const ref = useRef(null);

	const style = css`
		display: none;
		height: calc(100vh - 10vh - (5rem * 2));
		width: calc(100% - (2rem * 2));
		margin: 5rem 2rem;
		overflow: scroll;
	`;

	useEffect(() => {
		if (currentlyShown) {
			gsap.fromTo(
				ref.current,
				{ display: "none", opacity: 0 },
				{ display: "block", opacity: 1},
			);
		} else {
			gsap.to(ref.current, { display: "none", opacity: 0 });
		}
		console.log(currentlyShown);
	}, [currentlyShown]);

	return (
		<div css={[style, styles]} ref={ref}>
			{children}
		</div>
	);
}

export default SettingsPage;
