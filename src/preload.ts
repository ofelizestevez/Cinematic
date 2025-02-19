import { Theme, darkTheme, lightTheme } from "./Utilities/Theme";

// Function to set the CSS variables based on the given theme
const setCssVariables = (theme: Theme) => {
    for (const [key, value] of Object.entries(theme)) {
        // @ts-ignore to bypass type error as ThemeVariables is enum with string keys
        document.documentElement.style.setProperty(`--${key}`, value);
    }
};

// Function to preload and apply the theme
export const preloadTheme = () => {
    console.log("YEO")
    const storedTheme = localStorage.getItem("theme");

    if (storedTheme === "dark") {
        setCssVariables(darkTheme);
    } else if (storedTheme === "light") {
        setCssVariables(lightTheme);
    } else {
        // If no theme is found or it's a custom theme
        const customTheme = localStorage.getItem("customTheme");
        if (customTheme) {
            const parsedTheme: Theme = JSON.parse(customTheme);
            setCssVariables(parsedTheme);
        } else {
            // Default to light theme if no saved theme is found
            setCssVariables(lightTheme);
        }
    }
};

preloadTheme()
