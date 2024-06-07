import { css } from "@emotion/react";
import { usePageData } from "../utilities/ContentPageDataContext";
import Button from "./simple/Button";
import { useEffect } from "react";

const style = css`
    display: flex;
    gap: 1rem;
`

const button = css`
    height: 100%;
`

function ContentPageIndicator () {
    const {pageData, setPageData} = usePageData()

    useEffect(() => {
        console.log(pageData)
    })
    return (
        <div css={style}>
            {pageData.map((page) => {
                return (<Button css={button} key={`pageIndicator-${page.id}`}>{page.title}</Button>)
            })}
        </div>
    )
}

export default ContentPageIndicator