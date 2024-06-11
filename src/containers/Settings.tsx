import Overlay from "../components/basic/Overlay";
import { useSettingsOverlay } from "../context/SettingsOverlayContext";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeVariables } from "../utilities/Theme";
import { css } from "@emotion/react";
import { useState } from "react";
import SettingsSidebar from "../components/SettingsSidebar";
import SettingsContent from "./SettingsContent";
import Button from "../components/basic/Button";
import CloseIcon from "../assets/CloseIcon";

export enum SettingsPage {
	Content = "Content",
	Header = "Header",
	Theme = "Theme",
	ImportExport = "Import/Export",
}

const page = css`
	position: relative;
	height: 90%;
	width: 90%;
	background-color: var(${ThemeVariables.contentBgColor});
	color: var(${ThemeVariables.contentFgColor});
	border-radius: 8px;
	display: grid;
	grid-template-columns: 1fr 3fr;
`;

const closeIcon = css`
	position: absolute;
	top: 16px;
	right: 16px;
`;

const Settings = () => {
	const { showSettingsOverlay, setShowSettingsOverlay } = useSettingsOverlay();
	const [currentPage, setCurrentPage] = useState<SettingsPage>(
		SettingsPage.Content
	);

	return (
		<AnimatePresence>
			{showSettingsOverlay && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				>
					<Overlay>
						<div css={page}>
							<Button
								onClick={() => {
									setShowSettingsOverlay(!showSettingsOverlay);
								}}
								css={closeIcon}
							>
								<CloseIcon color={`var(${ThemeVariables.contentFgColor})`} />
							</Button>
							<SettingsSidebar
								currentPage={currentPage}
								setCurrentPage={setCurrentPage}
							/>
							<SettingsContent currentPage={currentPage} />
						</div>
					</Overlay>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default Settings;
