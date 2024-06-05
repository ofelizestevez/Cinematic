import { css } from "@emotion/react"
import { ReactNode } from "react"

interface props {
    children : ReactNode
}
function Overlay({children} : props) {
    const style = css`
    display: flex;
        position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		z-index: 1;
		justify-content: center;
		align-items: center;
		backdrop-filter: blur(8px);
    `
    return (
        <div css={style}>
            {children}
        </div>
    )
}

export default Overlay