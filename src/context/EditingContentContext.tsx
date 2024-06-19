import { createContext, useContext, useState } from "react";

interface EditingContentContextType {
    isEditingContent: boolean;
    setIsEditingContent: (editing: boolean) => void;
}
const EditingContentContext = createContext<EditingContentContextType | undefined>(undefined);

export const useEditingContent = () => {
    const context = useContext(EditingContentContext);
    if (!context) {
        throw new Error("useEditingContent must be used within an EditingContentProvider");
    }
    return context;
};

export const EditingContentProvider = ({ children }: React.PropsWithChildren<{}>) => {
    const [isEditingContent, setIsEditingContent] = useState<boolean>(false);

    return (
        <EditingContentContext.Provider value={{ isEditingContent, setIsEditingContent }}>
            {children}
        </EditingContentContext.Provider>
    );
};