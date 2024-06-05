import { css } from "@emotion/react";
import { MouseEventHandler, ReactNode } from "react";
import { ThemeVariables } from "../utilities/Theme";

interface Props {
	children?: ReactNode;
	onClick?: MouseEventHandler;
	[key: string]: any;
}

const styles = css`
	padding: 1rem 1rem;
	border-radius: 0.5rem;
	background-color: var(${ThemeVariables.contentHeaderBgColor});
	color: var(${ThemeVariables.contentFgColor});
`;

function Button({ children, onClick, ...props }: Props) {

	return (
		<button css={styles} onClick={onClick} {...props}>
			{children}
		</button>
	);
}

export default Button;
