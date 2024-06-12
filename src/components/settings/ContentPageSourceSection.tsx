import { css } from "@emotion/react";
import Checkbox from "../basic/Checkbox.tsx";
import Dropdown from "../basic/Dropdown.tsx";
import Input from "../basic/Input.tsx";
import { useEffect } from "react";

const style = css`
	> * {
		margin-bottom: 0.5rem;
	}
`

interface props {
	source: string;
	setSource: React.Dispatch<React.SetStateAction<string>>;
	sourceProvider: string;
	setSourceProvider: React.Dispatch<React.SetStateAction<string>>;
	sourceProviderOptions: string[];
	saveEnabledOption: boolean;
	setSaveEnabledOption: React.Dispatch<React.SetStateAction<boolean>>;
}

function ContentPageSourceSection({
	source,
	setSource,
	sourceProvider,
	setSourceProvider,
	sourceProviderOptions,
	saveEnabledOption,
	setSaveEnabledOption,
}: props) {
	const handleSourceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSource(event.target.value);
	};


	return (
		<div css={style}>
			<h2>Source Provider</h2>
			<Dropdown
				currentOption={sourceProvider}
				setCurrentOption={setSourceProvider}
				options={sourceProviderOptions}
			/>
			<h2>Source</h2>
			<Input>
				<input type="text" value={source} onChange={handleSourceChange} />
			</Input>
			<h2>Save Enabled</h2>
			<Checkbox
				isChecked={saveEnabledOption}
				setIsChecked={setSaveEnabledOption}
			/>
		</div>
	);
}

export default ContentPageSourceSection;