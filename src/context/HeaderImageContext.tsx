import React, { createContext, useState, useContext } from "react";

// Define the shape of the header image context
interface HeaderImageContextType {
    headerImage: string;
    setHeaderImage: (headerImage: string) => void;
}

// Initialize the context
const HeaderImageContext = createContext<HeaderImageContextType | undefined>(undefined);

// Custom hook to use the HeaderImageContext
export const useHeaderImage = () => {
    const context = useContext(HeaderImageContext);
    if (!context) {
        throw new Error("useHeaderImage must be used within a HeaderImageProvider");
    }
    return context;
};

// Define the provider component
export const HeaderImageProvider = ({ children }: React.PropsWithChildren<{}>) => {
    const [headerImage, setHeaderImage] = useState<string>("");

    return (
        <HeaderImageContext.Provider value={{ headerImage, setHeaderImage }}>
            {children}
        </HeaderImageContext.Provider>
    );
};