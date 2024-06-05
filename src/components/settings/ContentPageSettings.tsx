import { css } from "@emotion/react";
import { Providers } from "../../providers/_main";
import { Page } from "../../utilities/interfaces";
import Input from "../Input";
import SettingsPage from "../SettingsPage";
import { useEffect, useState } from "react";
import SourceSettingsSection from "./SourceSettingsSection";

interface props {
	currentlyShown: boolean;
	timelineRef: React.MutableRefObject<gsap.core.Timeline>;
	page: Page;
	setCurrentContentPage: (page: Page) => void;
}

function ContentPageSettings({
	currentlyShown,
	timelineRef,
	page,
	setCurrentContentPage,
}: props) {
	const [pageTitle, setPageTitle] = useState<string>(page.title);
	const [contentSource, setContentSource] = useState<string>(page.content.source);
	const [contentTypeOption, setContentTypeOption] = useState<string>(
		page.content.type
	);
	const [saveContentEnabled, setContentSavedEnabled] = useState(
		page.content.saveEnabled
	);
	const [styleSource, setStyleSource] = useState<string>(page.style.source);
	const [styleTypeOption, setStyleTypeOption] = useState<string>(
		page.style.type
	);
	const [saveStyleEnabled, setStyleSavedEnabled] = useState(
		page.style.saveEnabled
	);

	useEffect(() => {
		console.log(page);
	});
	const style = css`
		> * {
			margin-bottom: 1rem;
		}

		> * > * {
			margin-bottom: 0.25rem;
		}
	`;


	const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPageTitle(event.target.value);
	};

	const handleSave = () => {
		const newPage: Page = {
			id: page!.id,
			title: pageTitle,
			style: {
				type: styleTypeOption as Providers,
				source: styleSource,
				saveEnabled: saveStyleEnabled,
			},
			content: {
				type: contentTypeOption as Providers,
				source: contentSource,
				saveEnabled: saveContentEnabled,
			},
		};

		setCurrentContentPage(newPage);
	};

	return page ? (
		<SettingsPage
			currentlyShown={currentlyShown}
			timelineRef={timelineRef}
			styles={style}
		>
			<Input>
				<button onClick={handleSave}>Save</button>
			</Input>
			<div>
				<h1>Title</h1>
				<Input>
					<input type="text" value={pageTitle} onChange={handleTitleChange} />
				</Input>
			</div>
			<SourceSettingsSection
				title={"Content"}
				source={contentSource}
				setSource={setContentSource}
				sourceProvider={contentTypeOption}
				setSourceProvider={setContentTypeOption}
				sourceProviderOptions={Object.values(Providers)}
				saveEnabledOption={saveContentEnabled}
				setSaveEnabledOption={setContentSavedEnabled}
			/>
			<SourceSettingsSection
				title={"Style"}
				source={styleSource}
				setSource={setStyleSource}
				sourceProvider={styleTypeOption}
				setSourceProvider={setStyleTypeOption}
				sourceProviderOptions={Object.values(Providers)}
				saveEnabledOption={saveStyleEnabled}
				setSaveEnabledOption={setStyleSavedEnabled}
			/>
			<Input>
				<button onClick={handleSave}>Save</button>
			</Input>
		</SettingsPage>
	) : null;
}

export default ContentPageSettings;
