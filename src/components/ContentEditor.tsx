import { css } from "@emotion/react";
import Input from "./basic/Input";
import { ContentPageData } from '../utilities/ContentPage';

interface props {
    pageData: ContentPageData | undefined
}

const style = css`
	height: 100%;
	padding: 1rem;

	* {
		height: 100%;
		width: 100%;
	}
`

const ContentEditor = ({ pageData } : props) => {
	console.log(pageData)
	return (
		<div css={style}>
		<Input >
			<textarea name="" id=""></textarea>
		</Input>
		</div>
	);
}

export default ContentEditor;
