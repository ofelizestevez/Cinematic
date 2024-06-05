import { css } from "@emotion/react";
import Button from "./Button.tsx";
import CloseIcon from "../assets/CloseIcon.tsx";
import Overlay from "./Overlay.tsx";
import Settings from "./Settings.tsx";
import { ThemeVariables } from "../utilities/Theme.ts";

const closeIcon = css`
	position: absolute;
	top: 16px;
	right: 16px;
`;

interface SettingsOverlayProps {
	closeSettings: () => void;
	settingsRef: React.RefObject<HTMLDivElement>;
}

const SettingsOverlay = ({ closeSettings, settingsRef }: SettingsOverlayProps) => (
	<div style={{ display: "none", opacity: 0 }} ref={settingsRef}>
		<Overlay>
			<Settings>
				<div css={closeIcon}>
					<Button onClick={closeSettings}>
						<CloseIcon color={`var(${ThemeVariables.contentFgColor})`} />
					</Button>
				</div>
			</Settings>
		</Overlay>
	</div>
);

export default SettingsOverlay;