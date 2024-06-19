import { css } from "@emotion/react";
import Input from "./basic/Input";

const style = css`
    display: flex;
    background-color: red;
    height: 100%;
`

const container = css`
    display: flex;
    gap: 1rem;
    background-color: blue;
    flex-direction: column;
    width: 100%;
    overflow: hidden;
    padding: 1rem;
`

function ContentEditor() {
	return (
		<div css={style}>
			<div css={container}>
				<h1>Content</h1>
				<Input>
					<textarea name="" id=""></textarea>
				</Input>
			</div>
			<div css={container}>
				<h1>Style</h1>
				<Input>
					<div></div>
				</Input>
				<Input>
					<textarea name="" id="" ></textarea>
				</Input>
			</div>
		</div>
	);
}

export default ContentEditor;
