import { css, useTheme } from "@emotion/react";
import { ReactNode } from "react";

interface props {
	children?: ReactNode;
}

function Content({ children }: props) {
	const theme = useTheme();

	const styles = css`
		width: 100%;
		height: calc(100vh - ${theme.sizes.headerHeight});
	`;

	return <section css={styles}>{children}</section>;
}

export default Content;
