import { usePageSources } from "../utilities/ContentPageContext";

export const useLoadSettings = () => {
    const { setPageSources } = usePageSources();

    const loadSettings = () => {
        const settingsString = localStorage.getItem("settings") ?? "";
        try {
            const settings = JSON.parse(settingsString ?? "");

            if (settings.pages) {
                const pageSources = settings.pages;
                setPageSources(pageSources);
            }
        } catch (error) {
            console.error("Failed to parse settings:", error);
        }
    };

    return loadSettings;
};