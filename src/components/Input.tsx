import { css } from "@emotion/react";
import { ReactNode } from "react";
import { ThemeVariables } from "../utilities/Theme";

interface props {
	children?: ReactNode;
	inputRef?: React.RefObject<any>;
}

const style = css`
	* {
		color: var(${ThemeVariables.contentFgColor});
		background-color: var(${ThemeVariables.contentHeaderBgColor});
		margin: 0 2px;
		font-size: 1rem;
		padding: 0.75rem 0.5rem;
		border-radius: 0.5rem;
	}

	input[type="checkbox"] {
		outline: solid 2px var(${ThemeVariables.contentFgColor});
	}
`;

function Input({ children, inputRef }: props) {
	return (
		<div css={style} ref={inputRef}>
			{children}
		</div>
	);
}

export default Input;
