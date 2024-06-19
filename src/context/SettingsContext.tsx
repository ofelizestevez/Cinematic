import React, { createContext } from "react";
import { HeaderImageProvider } from "./HeaderImageContext";
import { ContentPagesProvider } from "./ContentPageContext";
import { ThemeProvider } from "./ThemeContext";
import { SettingsOverlayProvider } from "./SettingsOverlayContext";
import { CurrentContentPageProvider } from "./CurrentContentPageContext";
import { EditingContentProvider } from "./EditingContentContext";

// Initialize the context
const SettingsContext = createContext<{} | undefined>(undefined);

// Define the provider component
export const SettingsProvider = ({ children }: React.PropsWithChildren<{}>) => {
	return (
		<SettingsContext.Provider value={{}}>
			<HeaderImageProvider>
				<CurrentContentPageProvider>
					<ContentPagesProvider>
						<ThemeProvider>
							<SettingsOverlayProvider>
								<EditingContentProvider>{children}</EditingContentProvider>
							</SettingsOverlayProvider>
						</ThemeProvider>
					</ContentPagesProvider>
				</CurrentContentPageProvider>
			</HeaderImageProvider>
		</SettingsContext.Provider>
	);
};
