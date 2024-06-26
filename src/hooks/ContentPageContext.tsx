import React, { createContext, useState, useContext } from "react";
import { Page } from "../utilities/interfaces";

interface ContentPageContextType {
	pageSources: Page[];
	setPageSources: (pages: Page[]) => void;
}

const ContentPageContext = createContext<ContentPageContextType | undefined>(undefined);

export const usePageSources = () => {
	const context = useContext(ContentPageContext);
	if (!context) {
		throw new Error(
			"usePageSources must be used within a ContentPageProvider"
		);
	}
	return context;
};

export const ContentPageProvider = ({
	children,
}: React.PropsWithChildren<{}>) => {
	const [pageSources, setPageSources] = useState<Page[]>(() => {
		const storedSources = localStorage.getItem("sources");
		return storedSources ? JSON.parse(storedSources) : [];
	});

	return (
		<ContentPageContext.Provider value={{ pageSources, setPageSources }}>
			{children}
		</ContentPageContext.Provider>
	);
};