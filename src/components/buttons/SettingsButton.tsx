import { useTheme } from "@emotion/react";
import SettingsIcon from "../../assets/SettingsIcon"
import Button from "../Button"

interface props {
    showSettings: boolean
    setShowSettings: React.Dispatch<React.SetStateAction<boolean>>
}
// 
function SettingsButton ({showSettings, setShowSettings} : props) {
    
    const theme = useTheme();

    const handleClick = () => {
        console.log("HELLO")
        setShowSettings(!showSettings)
    }

    return (
        <Button onClick={handleClick}>
            <SettingsIcon color={`var(${theme.names.contentFgColor})`}/>
        </Button>
    )
}

export default SettingsButton