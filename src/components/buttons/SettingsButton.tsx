import SettingsIcon from "../../assets/SettingsIcon";
import Button from "../simple/Button";
import { ThemeVariables } from "../../utilities/Theme";

interface props {
	openSettings: () => void;
}
//
function SettingsButton({ openSettings }: props) {
	return (
		<Button onClick={openSettings}>
			<SettingsIcon color={`var(${ThemeVariables.contentFgColor})`} />
		</Button>
	);
}

export default SettingsButton;
