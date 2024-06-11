import React, { createContext } from "react";
import { HeaderImageProvider } from "./HeaderImageContext";
import { ContentPagesProvider } from "./ContentPageContext";
import { ThemeProvider } from "./ThemeContext";
import { SettingsOverlayProvider } from "./SettingsOverlayContext";

// Initialize the context
const SettingsContext = createContext<{} | undefined>(undefined);

// Define the provider component
export const SettingsProvider = ({ children }: React.PropsWithChildren<{}>) => {
	return (
		<SettingsContext.Provider value={{}}>
			<HeaderImageProvider>
				<ContentPagesProvider>
					<ThemeProvider>
						<SettingsOverlayProvider>{children}</SettingsOverlayProvider>
					</ThemeProvider>
				</ContentPagesProvider>
			</HeaderImageProvider>
		</SettingsContext.Provider>
	);
};
