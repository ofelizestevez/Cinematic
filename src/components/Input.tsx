import { css, useTheme } from "@emotion/react";
import { ReactNode } from "react";

interface props {
    children?: ReactNode
}
function Input ({children} : props) {

    const theme = useTheme();
    
    const style = css`
        * {
            color: var(${theme.names.contentFgColor});
            background-color: unset;
            border: solid 2px var(${theme.names.contentFgColor});
            margin: 0 2px;
            font-size: 1rem;
            padding: 0.25rem;
            border-radius: 0.5rem;
        }

        input[type=checkbox]{
            outline: solid 2px var(${theme.names.contentFgColor});
        }
    `
    return (
        <div css={style}>
            {children}
        </div>
    )
}

export default Input