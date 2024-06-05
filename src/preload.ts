import { themeToObject } from "./utilities/Helpers.ts";
import Theme, { ThemeNames, ThemeVariables } from "./utilities/Theme.ts";

// Gets Current Theme from localstorage
const currentTheme = (localStorage.getItem("currentTheme") as  ThemeNames | null ?? ThemeNames.LIGHT)
const themeVariables = themeToObject(currentTheme)

console.log(currentTheme)
Object.entries(themeVariables).forEach(([key , value]) => {
    document.documentElement.style.setProperty(key, value as string)
})

// Sets HTML background
document.documentElement.style.backgroundColor = `var(${ThemeVariables.contentBgColor})`;