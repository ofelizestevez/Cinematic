import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { ContentPage } from "../utilities/ContentPage"; // Adjust the import path as necessary

// Define the shape of the current content page context
interface CurrentContentPageContextType {
	currentContentPage: ContentPage | undefined;
	setCurrentContentPage: (page: ContentPage | undefined) => void;
}

// Initialize the context
const CurrentContentPageContext = createContext<CurrentContentPageContextType | undefined>(
	undefined
);

// Custom hook to use the CurrentContentPageContext
export const useCurrentContentPage = () => {
	const context = useContext(CurrentContentPageContext);
	if (!context) {
		throw new Error(
			"useCurrentContentPage must be used within a CurrentContentPageProvider"
		);
	}
	return context;
};

// Define the provider component
export const CurrentContentPageProvider = ({ children }: { children: ReactNode }) => {
	const [currentContentPage, setCurrentContentPage] = useState<ContentPage | undefined>(undefined);

	return (
		<CurrentContentPageContext.Provider value={{ currentContentPage, setCurrentContentPage }}>
			{children}
		</CurrentContentPageContext.Provider>
	);
};