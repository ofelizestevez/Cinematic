import { LocalStorageKeys } from "./utilities/LocalStorage.ts";
import { themeToObject } from "./utilities/Theme.ts";
import { Theme, ThemeVariables } from "./utilities/Theme.ts";

// Gets Current Theme from localstorage
const currentTheme = (localStorage.getItem(LocalStorageKeys.currentTheme) as  Theme | null ?? Theme.LIGHT)
const themeVariables = themeToObject(currentTheme)

console.log(currentTheme)
Object.entries(themeVariables).forEach(([key , value]) => {
    document.documentElement.style.setProperty(key, value as string)
})

// Sets HTML background
document.documentElement.style.backgroundColor = `var(${ThemeVariables.contentBgColor})`;