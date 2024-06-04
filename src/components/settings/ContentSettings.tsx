import { ReactSortable } from "react-sortablejs";
import SettingsPage from "../SettingsPage";
import { usePageSources } from "../../utilities/ContentPageContext";
import Button from "../Button";
import { css } from "@emotion/react";
import Input from "../Input";
import { useEffect } from "react";
import Theme from "../../utilities/Theme";
import Dropdown from "../Dropdown";
import { Providers } from "../../providers/_main";

interface props {
	currentlyShown: boolean;
	timelineRef: React.MutableRefObject<gsap.core.Timeline>;
}

function ContentSettings({ currentlyShown, timelineRef }: props) {
	const { pageSources, setPageSources } = usePageSources();

	const itemCss = css`
		/* margin-bottom: 2rem; */
		padding: 1rem;
	`

	const columnTitles = css`
		justify-content: end;
	`
	const style = css`
		display: grid;
		grid-template-columns: auto 1fr 1fr 1fr;
		gap: 1rem;
	`;

	const flex = css`
		display: flex;
		align-items: center;
		gap: 1rem;
	`

	const detailsCss = css`
		display: flex;
		flex-direction: column;
		gap: 1rem;
	`

	const contentCss = css`
		margin: 1rem 0;

		>*:nth-child(2n) {
			background-color: var(${Theme.names.contentHeaderBgColor});
		}
	`

	useEffect(() => {
		console.log(pageSources);
	});

	const handleAddClick = () => {
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
		<SettingsPage currentlyShown={currentlyShown} timelineRef={timelineRef}>
			<h1>Content</h1>
			<ReactSortable list={pageSources} setList={setPageSources} css={contentCss}>
				{pageSources.map((source) => (
					<div key={source.id} css={itemCss} >
						<div css={flex}>
							<h2>Title</h2>
							<Input>
								<input type="text" />
							</Input>
						</div>
						<div css={style}>
							<div css={[detailsCss, columnTitles]}>
								<h2></h2>
								<h2>Content</h2>
								<h2>Styles</h2>
							</div>
							<div css={detailsCss}>
								<h2>Type</h2>
								<Dropdown currentOption="" options={Object.values(Providers)}/>
							</div>

							<div css={detailsCss}>
								<h2>Source</h2>
								<Input>
									<input type="text" />
								</Input>
								<Input>
									<input type="text" />
								</Input>
							</div>

							<div css={detailsCss}>
								<h2>Save Enabled</h2>
								<Input>
									<input type="checkbox" />
								</Input>
								<Input>
									<input type="checkbox" />
								</Input>
							</div>
						</div>
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
