export enum ThemeVariables {
	contentFgColor = "--contentFgColor",
	contentBgColor = "--contentBgColor",
	contentHeaderBgColor = "--contentHeaderBgColor",
	contentHeaderShadow = "--contentHeaderShadow",
	alertBgColor = "--alertBgColor",
	alertFgColor = "--alertFgColor",
}

export interface Theme {
    contentFgColor: string;
    contentBgColor: string;
    contentHeaderBgColor: string;
    contentHeaderShadow: string;
    alertBgColor: string;
    alertFgColor: string;
}

export const darkTheme: Theme = {
    contentFgColor: "#FFFFFF",
    contentBgColor: "#080808",
    contentHeaderBgColor: "#1A1A1A",
    contentHeaderShadow: "unset",
    alertBgColor: "#E02929",
    alertFgColor: "#FFFFFF"
};

export const lightTheme: Theme = {
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