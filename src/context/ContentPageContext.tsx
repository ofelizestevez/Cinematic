import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { ContentPage } from "../utilities/ContentPage"; // Adjust the import path as necessary
import { LocalStorageKeys } from "../utilities/LocalStorage";
import { useCurrentContentPage } from "./CurrentContentPageContext";

// Define the shape of the content pages context
interface ContentPagesContextType {
	contentPages: ContentPage[];
	setContentPages: (pages: ContentPage[]) => void;
}

// Define the ContentPageData interface
export interface ContentPageData {
	id: number;
	title: string;
	style: string;
	content: string;
}

// Initialize the context
const ContentPagesContext = createContext<ContentPagesContextType | undefined>(
	undefined
);

// Custom hook to use the ContentPagesContext
export const useContentPages = () => {
	const context = useContext(ContentPagesContext);
	if (!context) {
		throw new Error(
			"useContentPages must be used within a ContentPagesProvider"
		);
	}
	return context;
};

// Define the provider component
export const ContentPagesProvider = ({ children }: { children: ReactNode }) => {
	const savedPages = localStorage.getItem(LocalStorageKeys.pages);
	const [contentPages, setContentPages] = useState<ContentPage[]>(
		JSON.parse(savedPages ?? "[]")
	);
	const { currentContentPage, setCurrentContentPage } = useCurrentContentPage();

	useEffect(() => {
		localStorage.setItem(LocalStorageKeys.pages, JSON.stringify(contentPages))

		if (!currentContentPage && contentPages.length > 0){
			setCurrentContentPage(contentPages[0])
		} else if (currentContentPage && !contentPages.some(page => page.id === currentContentPage.id)) {
            setCurrentContentPage(contentPages[0]);
        }
	}, [contentPages])

	return (
		<ContentPagesContext.Provider value={{ contentPages, setContentPages }}>
			{children}
		</ContentPagesContext.Provider>
	);
};
