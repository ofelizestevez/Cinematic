import React, { createContext, useState, useContext, useEffect } from "react";
import { Theme, ThemeDetails, getThemeDetails, themeToObject } from "../utilities/Theme"; // Adjust the import path as necessary
import { LocalStorageKeys } from "../utilities/LocalStorage";

// Define the shape of the theme context
interface ThemeContextType {
    theme: ThemeDetails;
    setTheme: (theme: ThemeDetails) => void;
}

// Initialize the context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Custom hook to use the ThemeContext
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};

// Define the provider component
export const ThemeProvider = ({ children }: React.PropsWithChildren<{}>) => {
    const currentTheme = (localStorage.getItem(LocalStorageKeys.currentTheme) as Theme | null ?? Theme.LIGHT)
    const themeDetails = getThemeDetails(currentTheme)
    const [theme, setTheme] = useState<ThemeDetails>(themeDetails as ThemeDetails);
    
    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};