import { css } from "@emotion/react";
import SettingsPage from "../SettingsPage";
import { ChangeEventHandler, useEffect, useState } from "react";
import { LocalStorageKeys } from "../../utilities/LocalStorage";
import { compressToBase64, decompressFromBase64} from "lz-string"
import Input from "../simple/Input";
import { useLoadSettings } from "../../hooks/useLoadSettings";
const style = css`
	> * {
		margin-bottom: 1rem;
	}

	> * > div {
		margin-bottom: 0.25rem;
	}
`;

function GeneralSettings() {
	const [compressedSettings, setCompressedSettings] = useState("")
	const [saveSettingsString, setSaveSettingsString] = useState("")
	const loadSettings = useLoadSettings();

	useEffect(() => {
		const settings = localStorage.getItem(LocalStorageKeys.settings)

		setCompressedSettings(compressToBase64(settings?? ""))
	})

	const handleChange : ChangeEventHandler<HTMLInputElement> = (e) => {
		setSaveSettingsString(e.target.value)
	}
	const handleClick = () => {
		localStorage.setItem(LocalStorageKeys.settings, decompressFromBase64(saveSettingsString))
		loadSettings()
	}

	return (
		<SettingsPage styles={style}>
			<h1>General</h1>
			<h2>Export Settings</h2>
			<Input>
				<input type="text" value={compressedSettings} />
			</Input>
			<h2>Import Settings</h2>
			<Input>
				<input type="text" value={saveSettingsString} onChange={handleChange}/>
			</Input>
			<Input>
				<button onClick={handleClick}>Save</button>
			</Input>
		</SettingsPage>
	);
}

export default GeneralSettings;
