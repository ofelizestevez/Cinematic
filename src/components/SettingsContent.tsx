import { useEffect, useRef, useState } from "react";
import ContentSettings from "./settings/ContentSettings";
import GeneralSettings from "./settings/GeneralSettings";
import ThemeSettings from "./settings/ThemeSettings";
import {gsap} from "gsap";
import { css } from "@emotion/react";
import { usePageSources } from "../utilities/ContentPageContext";
import { useGSAP } from "@gsap/react";
import { SettingsPage } from "./Settings";
import { LocalStorageKeys } from "../utilities/LocalStorage";
// import { compressToBase64, decompressFromBase64 } from 'lz-string'

interface props {
	currentPage: SettingsPage;
}

const style = css`
	position: relative;
`;

function SettingsContent({ currentPage }: props) {
	const [previousPage, setPreviousPage] = useState<SettingsPage | null>(
		currentPage
	);

	const container = useRef(null);
	const { pageSources } = usePageSources();

	useGSAP(
		() => {
			gsap.fromTo(container.current, { opacity: 1 }, { opacity: 0 });
			setPreviousPage(currentPage);
		},
		{ dependencies: [currentPage] }
	);

	useGSAP(
		() => {
			gsap.fromTo(container.current, { opacity: 0 }, { opacity: 1 });
		},
		{ dependencies: [previousPage] }
	);

	useEffect(() => {
		console.log(pageSources)
		const settings = {
			pages: pageSources,
		};
		const jsonSettings = JSON.stringify(settings);
		localStorage.setItem(LocalStorageKeys.settings, jsonSettings);
	}, [pageSources]);

	return (
		<div ref={container} css={style}>
			{currentPage == SettingsPage.GENERAL && <GeneralSettings />}
			{currentPage == SettingsPage.CONTENT && <ContentSettings />}
			{currentPage == SettingsPage.THEME && <ThemeSettings />}
		</div>
	);
}

export default SettingsContent;