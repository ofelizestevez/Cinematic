import React, { createContext, useState, useContext } from "react";

// Define the shape of the settings overlay context
interface SettingsOverlayContextType {
    showSettingsOverlay: boolean;
    setShowSettingsOverlay: (show: boolean) => void;
}

// Initialize the context
const SettingsOverlayContext = createContext<SettingsOverlayContextType | undefined>(undefined);

// Custom hook to use the SettingsOverlayContext
export const useSettingsOverlay = () => {
    const context = useContext(SettingsOverlayContext);
    if (!context) {
        throw new Error("useSettingsOverlay must be used within a SettingsOverlayProvider");
    }
    return context;
};

// Define the provider component
export const SettingsOverlayProvider = ({ children }: React.PropsWithChildren<{}>) => {
    const [showSettingsOverlay, setShowSettingsOverlay] = useState<boolean>(false);

    return (
        <SettingsOverlayContext.Provider value={{ showSettingsOverlay, setShowSettingsOverlay }}>
            {children}
        </SettingsOverlayContext.Provider>
    );
};