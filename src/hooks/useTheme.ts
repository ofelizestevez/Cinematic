import { useState, useEffect } from "react";
import { Theme } from "../utilities/Theme.ts";

export function useTheme(initialTheme: Theme) {
	const [theme, setTheme] = useState<Theme>(() => {
		const savedTheme = localStorage.getItem("currentTheme");
		return savedTheme ? (JSON.parse(savedTheme) as Theme) : initialTheme;
	});

	useEffect(() => {
		localStorage.setItem("currentTheme", JSON.stringify(theme));
	}, [theme]);

	return [theme, setTheme] as const;
}