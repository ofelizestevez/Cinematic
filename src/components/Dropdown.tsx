import { useState } from "react"
import Input from "./Input"
import { css } from "@emotion/react"

interface props {
    currentOption: string
    options : string[]
}
function Dropdown ({currentOption, options} : props) {
    const [currentlyShown, setCurrentlyShown] = useState(false)

    const dropdownMenu = css`
        display: ${currentlyShown ? "flex" : "none"};
        flex-direction: column;
    `

    const handleMainButtonClick = () => {
        setCurrentlyShown(!currentlyShown)
    }

    return <div>
        <Input>
            <button onClick={handleMainButtonClick}>{currentOption}</button>
        </Input>
        <div css={dropdownMenu}>
            {options.filter((item) => !currentOption.includes(item)).map((item) => (
                <button key={item}>{item}</button>
            ))}
            
        </div>
    </div>
}

export default Dropdown