import {
	createContext,
	useState,
	useContext,
	ReactNode,
	useEffect,
} from "react";
import { ContentPage } from "../utilities/ContentPage"; // Adjust the import path as necessary
import { LocalStorageKeys } from "../utilities/LocalStorage";
import { useCurrentContentPage } from "./CurrentContentPageContext";

// Define the shape of the content pages context
interface ContentPagesContextType {
	contentPages: ContentPage[];
	setContentPages: (pages: ContentPage[]) => void;
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
	const savedPages = localStorage.getItem(LocalStorageKeys.Pages);
	const [contentPages, setContentPages] = useState<ContentPage[]>(
		JSON.parse(savedPages ?? "[]")
	);
	const { currentContentPage, setCurrentContentPage } = useCurrentContentPage();

	useEffect(() => {
		localStorage.setItem(LocalStorageKeys.Pages, JSON.stringify(contentPages));
		const foundPage = contentPages.find(
			(page) => page.id === currentContentPage?.id
		);

		if (contentPages.length <= 0){
			setCurrentContentPage(undefined)
		}
		// If there is no current content page and there are available pages,
    	// set the current content page to the first page.
		else if (!currentContentPage && contentPages.length > 0) {
			setCurrentContentPage(contentPages[0]);
		}
		// If there is a current content page but it is not found in the
    	// contentPages array, set the current content page to the first page.
		else if (currentContentPage && !foundPage) {
			setCurrentContentPage(contentPages[0]);
		}
		// If the current content page exists, is found in the array,
    	// and its content has changed, update the current content page
		else if (
			currentContentPage &&
			foundPage &&
			currentContentPage.id === foundPage.id &&
			JSON.stringify(currentContentPage) !== JSON.stringify(foundPage)
		) {
			console.log("HUHHHHHHHHHHHHHH")
			setCurrentContentPage(foundPage)
		}

	}, [contentPages]);

	return (
		<ContentPagesContext.Provider value={{ contentPages, setContentPages }}>
			{children}
		</ContentPagesContext.Provider>
	);
};
