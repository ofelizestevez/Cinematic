import { MouseEventHandler, useRef, useState } from "react";
import Input from "./Input";
import { css } from "@emotion/react";
import { ThemeVariables } from "../utilities/Theme";

interface props {
	currentOption: string;
	setCurrentOption: React.Dispatch<React.SetStateAction<string>>;
	options: string[];
}

const style = css`
	position: relative;
`;

function Dropdown({ currentOption, setCurrentOption, options }: props) {
	const [currentlyShown, setCurrentlyShown] = useState(false);

	const dropdownRef = useRef<HTMLDivElement>(null);
	const mainButtonRef = useRef<HTMLButtonElement>(null);

	const dropdownMenu = css`
		position: absolute;
		margin-top: 0.5rem;
		display: ${currentlyShown ? "flex" : "none"};
		flex-direction: column;
		background-color: var(${ThemeVariables.contentHeaderBgColor});
		border-radius: 0.5rem;
		padding: 1rem;
		gap: 1rem;

		button {
			background-color: unset;
			color: var(${ThemeVariables.contentFgColor});
			z-index: 2;
		}
	`;
	function handleClickOutside(event: MouseEvent) {
		if (
			dropdownRef.current &&
			(mainButtonRef.current === event.target ||
				!dropdownRef.current.contains(event.target as Node))
		) {
			setCurrentlyShown(false);
		}
		document.removeEventListener("mousedown", handleClickOutside);
	}

	const handleMainButtonClick = () => {
		setCurrentlyShown(!currentlyShown);
		document.addEventListener("mousedown", handleClickOutside);
	};

	const handleOptionClick: MouseEventHandler = (e) => {
		const target = e.target as HTMLButtonElement;
		setCurrentOption(target.getAttribute("data-key") ?? currentOption);
		setCurrentlyShown(false);
	};

	return (
		<div css={style} ref={dropdownRef}>
			<Input inputRef={mainButtonRef}>
				<button onClick={handleMainButtonClick}>{currentOption}</button>
			</Input>
			<div css={dropdownMenu}>
				{options
					.filter((item) => !currentOption.includes(item))
					.map((item) => (
						<button key={item} onClick={handleOptionClick} data-key={item}>
							{item}
						</button>
					))}
			</div>
		</div>
	);
}

export default Dropdown;
