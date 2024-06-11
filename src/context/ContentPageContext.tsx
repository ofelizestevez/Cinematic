import React, { createContext, useState, useContext } from "react";
import { ContentPage } from "../utilities/ContentPage"; // Adjust the import path as necessary

// Define the shape of the content pages context
interface ContentPagesContextType {
    contentPages: ContentPage[];
    setContentPages: (pages: ContentPage[]) => void;
}

// Initialize the context
const ContentPagesContext = createContext<ContentPagesContextType | undefined>(undefined);

// Custom hook to use the ContentPagesContext
export const useContentPages = () => {
    const context = useContext(ContentPagesContext);
    if (!context) {
        throw new Error("useContentPages must be used within a ContentPagesProvider");
    }
    return context;
};

// Define the provider component
export const ContentPagesProvider = ({ children }: React.PropsWithChildren<{}>) => {
    const [contentPages, setContentPages] = useState<ContentPage[]>([]);

    return (
        <ContentPagesContext.Provider value={{ contentPages, setContentPages }}>
            {children}
        </ContentPagesContext.Provider>
    );
};