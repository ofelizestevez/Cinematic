// * Imports
import { useEffect, useState } from "react";
import {gsap} from "gsap";
import { useGSAP } from "@gsap/react";


import Content from "./components/Content";
import Footer from "./components/Footer.tsx";
import SettingsOverlay from "./components/SettingsOverlay.tsx";

import { Theme, themeToObject } from "./utilities/Theme.ts";

import { useSettings } from "./hooks/useSettings.ts";
import { useLoadSettings } from "./hooks/useLoadSettings.ts";
import { LocalStorageKeys } from "./utilities/LocalStorage.ts";
import Header from "./components/Header.tsx";
import useFetchPageData from "./hooks/useFetchPageData.tsx";

// * Component
function App() {
    // * States
	const [initialized, setInitialized] = useState(false)
    const [theme, setTheme] = useState<Theme>(() => {
		const savedTheme = localStorage.getItem(LocalStorageKeys.currentTheme);
		return savedTheme ? (JSON.parse(savedTheme) as Theme) : Theme.LIGHT;
	});

    // * Hooks
    const { showSettings, openSettings, closeSettings, settingsRef } = useSettings();
    const loadSettings = useLoadSettings();
    useFetchPageData(); // Use the custom hook to fetch page data
    
    // * Animates Theme
    useGSAP(() => {
		const themeVariableValues = themeToObject(theme);
		gsap.to(":root", themeVariableValues);
    }, [theme]);

    // * App initialization
    useEffect(() => {
		if (!initialized) {
            loadSettings();
            setInitialized(true);
        }
    }, [initialized, loadSettings]);

    return (
        <>
            <Header setTheme={setTheme} />
            <Content />
            {showSettings && <SettingsOverlay closeSettings={closeSettings} settingsRef={settingsRef} />}
            <Footer openSettings={openSettings} />
        </>
    );
}

export default App;