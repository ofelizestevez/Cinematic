import SquareIconChecked from "../../assets/SquareIconChecked"
import SquareIcon from "../../assets/SquareIcon"
import { ThemeVariables } from "../../utilities/Theme"

interface props {
    isChecked: boolean
    setIsChecked: React.Dispatch<React.SetStateAction<boolean>>
    [key: string]: any;
}
function Checkbox ({isChecked, setIsChecked, ...props} : props) {
    
    return (
        <div style={{ cursor: 'pointer' }} onClick={() => {setIsChecked(!isChecked)}} {...props}>
            {isChecked ? <SquareIconChecked color={`var(${ThemeVariables.contentFgColor})`}/> : <SquareIcon color={`var(${ThemeVariables.contentFgColor})`}/>}
        </div>
    )
}

export default Checkbox