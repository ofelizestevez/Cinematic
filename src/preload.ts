import Theme from "./utilities/Theme.ts";

// Gets Current Theme from localstorage
const currentTheme: 'dark' | 'light' = localStorage.getItem("currentTheme") as 'dark' | 'light' ?? "light";

// Sets theme variables
document.documentElement.style.setProperty("--contentFgColor", Theme.colors[currentTheme].contentFgColor)
document.documentElement.style.setProperty("--contentBgColor", Theme.colors[currentTheme].contentBgColor)
document.documentElement.style.setProperty("--contentHeaderBgColor", Theme.colors[currentTheme].contentHeaderBgColor)
document.documentElement.style.setProperty("--contentHeaderShadow", Theme.colors[currentTheme].contentHeaderShadow)

// Sets HTML background
document.documentElement.style.backgroundColor = `var(${Theme.names.contentBgColor})`;