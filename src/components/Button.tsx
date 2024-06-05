import { css, useTheme } from "@emotion/react";
import { MouseEventHandler, ReactNode } from "react";


interface Props {
	children?: ReactNode;
	onClick?: MouseEventHandler;
	[key: string]: any;
}

function Button({ children, onClick, ...props}: Props) {
	const theme = useTheme();

	const styles = css`
		padding: 1rem 1rem;
		border-radius: 0.5rem;
		background-color: var(${theme.names.contentHeaderBgColor});
		color: var(${theme.names.contentFgColor});
	`;

	return (
		<button css={styles} onClick={onClick} {...props}>
			{children}
		</button>
	);
}

export default Button;
