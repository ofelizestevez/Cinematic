import React, { createContext, useState, useContext } from "react";
import { Page, PageData } from "./interfaces";

interface PageDataContextType {
    pageData: PageData[];
    setPageData: React.Dispatch<React.SetStateAction<PageData[]>>;
}

const PageDataContext = createContext<PageDataContextType | undefined>(undefined);

export const usePageData = () => {
    const context = useContext(PageDataContext);
    if (!context) {
        throw new Error(
            "usePageData must be used within a PageDataProvider"
        );
    }
    return context;
};

export const PageDataProvider = ({
    children,
}: React.PropsWithChildren<{}>) => {
    const [pageData, setPageData] = useState<PageData[]>(() => {
        const storedData = localStorage.getItem("pageData");
        return storedData ? JSON.parse(storedData) : [];
    });

    return (
        <PageDataContext.Provider value={{ pageData, setPageData }}>
            {children}
        </PageDataContext.Provider>
    );
};