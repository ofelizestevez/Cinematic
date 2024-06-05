// ThemeContext.tsx
import React, { createContext, useState, useContext, useEffect } from "react";
import Theme from "./Theme";
import gsap from "gsap";

export type ThemeType = "light" | "dark" | "custom"; // Add 'custom' type

interface ThemeContextType {
	currentTheme: ThemeType;
	toggleTheme: (theme: ThemeType) => void; // Modify toggleTheme function
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useCurrentTheme = () => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error(
			"useCurrentTheme must be used within a CurrentThemeProvider"
		);
	}
	return context;
};

export const CurrentThemeProvider = ({
	children,
}: React.PropsWithChildren<{}>) => {
	const [currentTheme, setCurrentTheme] = useState<ThemeType>(() => {
		const storedTheme = localStorage.getItem("currentTheme");
		return (storedTheme as ThemeType) || "light";
	});

	useEffect(() => {
		localStorage.setItem("currentTheme", currentTheme);
	}, [currentTheme]);

	const toggleTheme = (theme: ThemeType) => {
		// Modify toggleTheme function

		if (currentTheme != theme) {
            gsap.to(document.documentElement, {
                "--contentFgColor": Theme.colors[theme as "dark" | "light"].contentFgColor,
                "--contentBgColor": Theme.colors[theme as "dark" | "light"].contentBgColor,
                "--contentHeaderBgColor": Theme.colors[theme as "dark" | "light"].contentHeaderBgColor,
                "--contentHeaderShadow": Theme.colors[theme as "dark" | "light"].contentHeaderShadow,
            })
		}
		setCurrentTheme(theme);
	};

	return (
		<ThemeContext.Provider value={{ currentTheme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};
