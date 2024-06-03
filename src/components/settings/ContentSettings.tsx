import { ReactSortable } from "react-sortablejs";
import SettingsPage from "../SettingsPage";
import { usePageSources } from "../../utilities/ContentPageContext";
import Button from "../Button";
import { css } from "@emotion/react";

interface props {
	currentlyShown: boolean;
}

function ContentSettings({ currentlyShown }: props) {
	const { pageSources, setPageSources } = usePageSources();

	const style = css`
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
	`;

	const handleAddClick = () => {
		const x = ["a", "b", "c"];

		console.log(x.slice(-1)[0]);
		setPageSources([
			...pageSources,
			{
				id: (pageSources.slice(-1)[0]?.id ?? 0) + 1,
				title: "",
				sourceType: "",
				source: "",
			},
		]);
	};

	pageSources.slice(-1);

	return (
		<SettingsPage currentlyShown={currentlyShown}>
			<h1>Content</h1>
			<div css={style}>
				<h2>Title</h2>
				<h2>Source Type</h2>
				<h2>Source</h2>
			</div>
			<ReactSortable list={pageSources} setList={setPageSources}>
				{pageSources.map((source) => (
					<div css={style}>
						<p>hi</p>
						<p>hi</p>
						<p>hi</p>
					</div>
				))}
			</ReactSortable>

			<Button onClick={handleAddClick}>
				<p>Add Source</p>
			</Button>
		</SettingsPage>
	);
}

export default ContentSettings;
