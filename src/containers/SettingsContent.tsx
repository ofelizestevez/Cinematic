import { css } from "@emotion/react";
import { SettingsPage } from "./Settings";
import { AnimatePresence, motion } from "framer-motion";
import ContentSettings from "../components/settings/ContentSettings";
import HeaderSettings from "../components/settings/HeaderSettings";
import ThemeSettings from "../components/settings/ThemeSettings";
import ImportExportSettings from "../components/settings/ImportExportSettings";

interface props {
	currentPage: SettingsPage;
}

const style = css`
	position: relative;
`;

function SettingsContent({ currentPage }: props) {
	return (
		<AnimatePresence>
			<div>
				<motion.div
					css={style}
					key={currentPage}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				>
					{currentPage == SettingsPage.Content && <ContentSettings />}
					{currentPage == SettingsPage.Header && <HeaderSettings />}
					{currentPage == SettingsPage.Theme && <ThemeSettings />}
					{currentPage == SettingsPage.ImportExport && <ImportExportSettings />}
				</motion.div>
			</div>
		</AnimatePresence>
	);
}

export default SettingsContent;
