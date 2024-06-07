import Checkbox from "../simple/Checkbox";
import Dropdown from "../simple/Dropdown";
import Input from "../simple/Input";

interface props {
	title: string;
	source: string;
	setSource: React.Dispatch<React.SetStateAction<string>>;
	sourceProvider: string;
	setSourceProvider: React.Dispatch<React.SetStateAction<string>>;
	sourceProviderOptions: string[];
	saveEnabledOption: boolean;
	setSaveEnabledOption: React.Dispatch<React.SetStateAction<boolean>>;
}

function SourceSettingsSection({
	title,
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
		<>
			<h1>{title}</h1>
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
		</>
	);
}

export default SourceSettingsSection;
