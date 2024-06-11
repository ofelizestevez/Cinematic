import React, { createContext } from "react";
import { HeaderImageProvider } from "./HeaderImageContext";
import { ContentPagesProvider } from "./ContentPageContext";
import { ThemeProvider } from "./ThemeContext";

// Initialize the context
const SettingsContext = createContext<{} | undefined>(undefined);

// Define the provider component
export const SettingsProvider = ({ children }: React.PropsWithChildren<{}>) => {
    return (
        <SettingsContext.Provider value={{}}>
            <HeaderImageProvider>
                <ContentPagesProvider>
                    <ThemeProvider>
                        {children}
                    </ThemeProvider>
                </ContentPagesProvider>
            </HeaderImageProvider>
        </SettingsContext.Provider>
    );
};