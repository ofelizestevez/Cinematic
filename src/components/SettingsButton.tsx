import SettingsIcon from "../assets/SettingsIcon";
import { useSettingsOverlay } from "../context/SettingsOverlayContext";
import { ThemeVariables } from "../utilities/Theme";
import Button from "./basic/Button";

function SettingsButton() {
	const {showSettingsOverlay, setShowSettingsOverlay} = useSettingsOverlay()
    
    const handleClick = () => {
        setShowSettingsOverlay(!showSettingsOverlay)
    }

    return (
		<Button onClick={handleClick}>
			<SettingsIcon color={`var(${ThemeVariables.contentFgColor})`} />
		</Button>
	);
}

export default SettingsButton;