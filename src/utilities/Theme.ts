export enum Theme {
	LIGHT,
	DARK,
	CUSTOM,
}

export enum ThemeVariables {
	contentFgColor = "--contentFgColor",
	contentBgColor = "--contentBgColor",
	contentHeaderBgColor = "--contentHeaderBgColor",
	contentHeaderShadow = "--contentHeaderShadow",
	alertBgColor = "--alertBgColor",
	alertFgColor = "--alertFgColor",
}

export interface ThemeDetails {
	contentFgColor: string;
	contentBgColor: string;
	contentHeaderBgColor: string;
	contentHeaderShadow: string;
	alertBgColor: string;
	alertFgColor: string;
}

export const darkTheme: ThemeDetails = {
	contentFgColor: "#FFFFFF",
	contentBgColor: "#080808",
	contentHeaderBgColor: "#1A1A1A",
	contentHeaderShadow: "unset",
	alertBgColor: "#E02929",
	alertFgColor: "#FFFFFF"
};

export const lightTheme: ThemeDetails = {
	contentFgColor: "#000000",
	contentBgColor: "#F0F0F0",
	contentHeaderBgColor: "#FFFFFF",
	contentHeaderShadow: `
	0px 11px 25px 0px rgba(0, 0, 0, 0.06), 
	0px 45px 45px 0px rgba(0, 0, 0, 0.05), 
	0px 101px 60px 0px rgba(0, 0, 0, 0.03), 
	0px 179px 72px 0px rgba(0, 0, 0, 0.01), 
	0px 280px 78px 0px rgba(0, 0, 0, 0.00) 
	`,
	alertBgColor: "#F25757",
	alertFgColor: "#000000"
};

export const themeSizes = {
	headerHeight: "40vh",
	buttonPaddingHeight: "1rem",
	buttonPaddingWidth: "2rem",
	buttonBottom: "1rem",
	buttonGap: "1rem",
	contentHeaderPaddingHeight: "2rem",
};

export const themeToObject = (theme: Theme) => {
    const themeDetails = (() => {
        if (theme == Theme.DARK) {
            return darkTheme;
        }
        return lightTheme;
    })();

    const themeVariableValues: any = {};
    Object.keys(themeDetails).map((themeDetailsVariable) => {
        const themeVariableName = ThemeVariables[themeDetailsVariable as keyof typeof ThemeVariables];

        themeVariableValues[themeVariableName] = themeDetails[themeDetailsVariable as keyof typeof themeDetails];
    });

    return themeVariableValues;
};
