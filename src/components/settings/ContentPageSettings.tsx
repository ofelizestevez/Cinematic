import { css } from "@emotion/react";
import { Providers } from "../../utilities/providers/_main";
import { Page } from "../../utilities/interfaces";

import SettingsPage from "../SettingsPage";
import { ReactNode, useState } from "react";
import SourceSettingsSection from "./SourceSettingsSection";
import Input from "../simple/Input";

interface props {
	page: Page;
	setCurrentContentPage: (page: Page) => void;
	children: ReactNode;
}

const style = css`
	> * {
		margin-bottom: 1rem;
	}

	> * > div {
		margin-bottom: 0.25rem;
	}
`;

function ContentPageSettings({ page, setCurrentContentPage, children }: props) {
	const [pageTitle, setPageTitle] = useState<string>(page.title);
	const [contentSource, setContentSource] = useState<string>(
		page.content.source
	);
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
		<SettingsPage styles={style}>
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
			{children}
		</SettingsPage>
	) : null;
}

export default ContentPageSettings;
