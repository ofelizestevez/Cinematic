import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { motion } from "framer-motion";
import { Theme, lightTheme, darkTheme } from "./Theme";

// Theme Context
export const ThemeContext = createContext<{
    theme: Theme;
    toggleTheme: () => void;
    setCustomTheme: (theme: Theme) => void;
} | undefined>(undefined);

// ThemeProvider to manage the theme
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<Theme>(lightTheme);
    const [isInitialRender, setIsInitialRender] = useState(true);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") setTheme(darkTheme);
        else setTheme(lightTheme);

        setIsInitialRender(false); // Mark that the initial render is complete
    }, []);

    // Function to update the CSS variables on the root element
    const updateCssVariables = (theme: Theme) => {
        for (const key in theme) {
            if (theme.hasOwnProperty(key)) {
                document.documentElement.style.setProperty(`--${key}`, theme[key as keyof Theme]);
            }
        }
    };

    useEffect(() => {
        if (!isInitialRender) {
            updateCssVariables(theme);
        }
    }, [theme, isInitialRender]);

    const toggleTheme = () => {
        const newTheme = theme === lightTheme ? darkTheme : lightTheme;
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme === lightTheme ? "light" : "dark");
    };

    const setCustomTheme = (newTheme: Theme) => {
        setTheme(newTheme);
        localStorage.setItem("theme", "custom");
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, setCustomTheme }}>
            {/* No longer using motion.div here, instead we are animating CSS variables */}
                {children}
        </ThemeContext.Provider>
    );
};

// Custom hook to use theme
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};
