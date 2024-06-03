import { css, useTheme } from "@emotion/react";
import { ReactNode, useEffect } from "react";

interface props {
	children?: ReactNode;
}

function Content ({ children }: props) {
    const theme = useTheme();
    
    const styles = css`
        width: 100%;
        height: calc(100vh - ${theme.sizes.headerHeight});
    `
    
    useEffect(() => {
        console.log(theme)
    })
    return (
        <section css={styles}>
            {children}
        </section>
    )
}

export default Content