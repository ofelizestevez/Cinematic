import React, { createContext, useState, useContext } from "react";
import { PageData } from "../utilities/interfaces";

interface PageDataContextType {
    pageData: PageData[];
    setPageData: React.Dispatch<React.SetStateAction<PageData[]>>;
    currentPageData: PageData | null;
    setCurrentPageData: React.Dispatch<React.SetStateAction<PageData | null>>;
}

const PageDataContext = createContext<PageDataContextType | undefined>(undefined);

export const usePageData = () => {
    const context = useContext(PageDataContext);
    if (!context) {
        throw new Error("usePageData must be used within a PageDataProvider");
    }
    return context;
};

export const PageDataProvider = ({ children }: React.PropsWithChildren<{}>) => {
    const [pageData, setPageData] = useState<PageData[]>([]);
    const [currentPageData, setCurrentPageData] = useState<PageData | null>(null);

    return (
        <PageDataContext.Provider value={{ pageData, setPageData, currentPageData, setCurrentPageData }}>
            {children}
        </PageDataContext.Provider>
    );
};