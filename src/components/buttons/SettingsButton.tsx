import { useTheme } from "@emotion/react";
import SettingsIcon from "../../assets/SettingsIcon"
import Button from "../Button"

interface props {
    openSettings: () => void;
}
// 
function SettingsButton ({ openSettings }: props) {
    
    const theme = useTheme();

    return (
        <Button onClick={openSettings}>
            <SettingsIcon color={`var(${theme.names.contentFgColor})`}/>
        </Button>
    )
}

export default SettingsButton