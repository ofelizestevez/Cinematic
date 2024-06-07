export const getRootCssVar = (variableName : string) => {
    return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
};