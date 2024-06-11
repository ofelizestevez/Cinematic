import React, { createContext, useState, useContext } from "react";
import { ThemeDetails } from "../utilities/Theme"; // Adjust the import path as necessary

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
    const [theme, setTheme] = useState<ThemeDetails>({} as ThemeDetails);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};