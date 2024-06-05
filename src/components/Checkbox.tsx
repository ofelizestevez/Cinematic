import { useState } from "react"
import SquareIconChecked from "../assets/SquareIconChecked"
import SquareIcon from "../assets/SquareIcon"
import { useTheme } from "@emotion/react"

interface props {
    isChecked: boolean
    setIsChecked: React.Dispatch<React.SetStateAction<boolean>>
}
function Checkbox ({isChecked, setIsChecked} : props) {
    const theme = useTheme();

    const handleCheckboxClick = () => {
        setIsChecked(!isChecked)
    }
    return (
        <div onClick={handleCheckboxClick} style={{ cursor: 'pointer' }}>
            {isChecked ? <SquareIconChecked color={`var(${theme.names.contentFgColor})`}/> : <SquareIcon color={`var(${theme.names.contentFgColor})`}/>}
        </div>
    )
}

export default Checkbox