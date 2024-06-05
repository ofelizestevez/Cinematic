import { useEffect } from "react";
import { usePageSources } from "../utilities/ContentPageContext";
import { useInitialized } from "../utilities/InitializedContext";

export const useLoadSettings = () => {
    const { setPageSources } = usePageSources();
    const { initialized, setInitialized } = useInitialized();

    useEffect(() => {
        if (!initialized) {
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

            setInitialized(true);
        }
    }, [initialized, setInitialized, setPageSources]);
};