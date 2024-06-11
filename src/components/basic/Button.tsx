import { css } from "@emotion/react";
import { ReactNode } from "react";
import { ThemeVariables } from "../../utilities/Theme";

interface Props {
	children?: ReactNode;
	[key: string]: any;
}

const styles = css`
	padding: 1rem 1rem;
	border-radius: 0.5rem;
	background-color: var(${ThemeVariables.contentHeaderBgColor});
	color: var(${ThemeVariables.contentFgColor});
`;

function Button({ children, ...props }: Props) {

	return (
		<button css={styles} {...props}>
			{children}
		</button>
	);
}

export default Button;
