import { css, useTheme } from "@emotion/react";
import { Providers } from "../../providers/_main";
import { Page } from "../../utilities/interfaces";
import Dropdown from "../Dropdown";
import Input from "../Input";
import SettingsPage from "../SettingsPage";
import Button from "../Button";
import LeftArrowIcon from "../../assets/LeftArrowIcon";

interface props {
	currentlyShown: boolean;
	timelineRef: React.MutableRefObject<gsap.core.Timeline>;
	page?: Page;
	setCurrentlyShowing: React.Dispatch<React.SetStateAction<string>>;
}

function ContentPageSettings({ currentlyShown, timelineRef , setCurrentlyShowing}: props) {
	const theme = useTheme();
	
	const closeIcon = css`
		position: absolute;
		top: 16px;
		left: 16px;
	`;

	const handleBackButton = () => {
		setCurrentlyShowing("main")
	};

	return (
		<SettingsPage currentlyShown={currentlyShown} timelineRef={timelineRef}>
			<div>
				<h1>Title</h1>
				<Input>
					<input type="text" />
				</Input>
			</div>
			<div>
				<h1>Content</h1>
				<h2>Type</h2>
				<Dropdown currentOption="none" options={Object.values(Providers)} />
				<h2>Source</h2>
				<Input>
					<input type="text" />
				</Input>
			</div>
			<div>
				<h1>Styles</h1>
				<h2>Type</h2>
				<Dropdown currentOption="none" options={Object.values(Providers)} />
				<h2>Source</h2>
				<Input>
					<input type="text" />
				</Input>
			</div>
			<div css={closeIcon}>
				<Button onClick={handleBackButton}>
					<LeftArrowIcon color={`var(${theme.names.contentFgColor})`} />
				</Button>
			</div>
		</SettingsPage>
	);
}

export default ContentPageSettings;
