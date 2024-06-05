import SquareIconChecked from "../assets/SquareIconChecked"
import SquareIcon from "../assets/SquareIcon"
import { ThemeVariables } from "../utilities/Theme"

interface props {
    isChecked: boolean
    setIsChecked: React.Dispatch<React.SetStateAction<boolean>>
}
function Checkbox ({isChecked, setIsChecked} : props) {

    const handleCheckboxClick = () => {
        setIsChecked(!isChecked)
    }
    return (
        <div onClick={handleCheckboxClick} style={{ cursor: 'pointer' }}>
            {isChecked ? <SquareIconChecked color={`var(${ThemeVariables.contentFgColor})`}/> : <SquareIcon color={`var(${ThemeVariables.contentFgColor})`}/>}
        </div>
    )
}

export default Checkbox