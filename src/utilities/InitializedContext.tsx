import React, { createContext, useState, useContext } from "react";

interface InitializedContextType {
  initialized: boolean;
  setInitialized: React.Dispatch<React.SetStateAction<boolean>>;
}

const InitializedContext = createContext<InitializedContextType | undefined>(
  undefined
);

export const useInitialized = () => {
  const context = useContext(InitializedContext);
  if (!context) {
    throw new Error(
      "useInitialized must be used within an InitializedProvider"
    );
  }
  return context;
};

export const InitializedProvider = ({
  children,
}: React.PropsWithChildren<{}>) => {
  const [initialized, setInitialized] = useState(false);

  return (
    <InitializedContext.Provider value={{ initialized, setInitialized }}>
      {children}
    </InitializedContext.Provider>
  );
};