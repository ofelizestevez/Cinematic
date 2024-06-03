import { css, useTheme } from "@emotion/react";
import { ReactNode } from "react";

interface props {
	children?: ReactNode;
	onClick?: () => void;
}

function Button({ children, onClick }: props) {
	const theme = useTheme();

	const styles = css`
		padding: 1rem 1rem;
		border-radius: 0.5rem;
		background-color: var(${theme.names.contentHeaderBgColor});
	`;

	return (
		<button css={styles} onClick={onClick}>
			{children}
		</button>
	);
}

export default Button;
