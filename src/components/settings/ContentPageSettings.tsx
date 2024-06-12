import { ReactNode, useEffect, useState } from "react";
import { ContentPage } from "../../utilities/ContentPage";
import SettingsPage from "../SettingsPage";
import Input from "../basic/Input";
import ContentPageSourceSection from "./ContentPageSourceSection";
import { Providers } from "../../utilities/providers/_main";
import { css } from "@emotion/react";

const style = css`
	h1 {
		margin-bottom: 1rem;
	}
	> *:not(:last-child) {
		margin-bottom: 1rem;
	}
`

interface props {
	page: ContentPage;
    children?: ReactNode;
	save: (page: ContentPage) => void
}

function ContentPageSettings({ page, children, save }: props) {
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
		const newPage : ContentPage = {
			id: page.id,
			title: pageTitle,
			content: {
				type: contentTypeOption as unknown as Providers,
				source: contentSource,
				saveEnabled: saveContentEnabled
			},
			style: {
				type: styleTypeOption as unknown as Providers,
				source: styleSource,
				saveEnabled: saveStyleEnabled
			}
		}

		save(newPage)
	}

	useEffect(() => {
		console.log(contentTypeOption)
	})
	
	
	return (
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
			<div>
				<h1>Content</h1>
				<ContentPageSourceSection 
				source={contentSource}
				setSource={setContentSource}
				sourceProvider={contentTypeOption}
				setSourceProvider={setContentTypeOption}
				sourceProviderOptions={Object.values(Providers)}
				saveEnabledOption={saveContentEnabled}
				setSaveEnabledOption={setContentSavedEnabled}
				/>
			</div>
			<div>
				<h1>Style</h1>
				<ContentPageSourceSection
				source={styleSource}
				setSource={setStyleSource}
				sourceProvider={styleTypeOption}
				setSourceProvider={setStyleTypeOption}
				sourceProviderOptions={Object.values(Providers)}
				saveEnabledOption={saveStyleEnabled}
				setSaveEnabledOption={setStyleSavedEnabled}
				/>
			</div>

			<Input>
				<button>Save</button>
			</Input>
            {children}
		</SettingsPage>
	);
}

export default ContentPageSettings;
