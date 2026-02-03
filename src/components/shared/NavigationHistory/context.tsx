import { createContext, useContext, useState, type ReactNode } from "react";

export type BreadItem = {
  title: string;
  url: string;
};

export type NavigationHistoryState = {
  main: BreadItem;
  items: BreadItem[];
};

type NavigationHistoryContextValue = {
  history: NavigationHistoryState;
  setHistory: React.Dispatch<React.SetStateAction<NavigationHistoryState>>;
};

const NavigationHistoryContext = createContext<
  NavigationHistoryContextValue | undefined
>(undefined);

const defaultHistory: NavigationHistoryState = {
  main: { title: "Map", url: "/" },
  items: [],
};

type NavigationHistoryProviderProps = {
  children: ReactNode;
  initialState?: NavigationHistoryState;
};

export function NavigationHistoryProvider({
  children,
  initialState = defaultHistory,
}: NavigationHistoryProviderProps) {
  const [history, setHistory] =
    useState<NavigationHistoryState>(initialState);

  return (
    <NavigationHistoryContext.Provider value={{ history, setHistory }}>
      {children}
    </NavigationHistoryContext.Provider>
  );
}

export function useNavigationHistory() {
  const context = useContext(NavigationHistoryContext);
  if (context === undefined) {
    throw new Error(
      "useNavigationHistory must be used within a NavigationHistoryProvider"
    );
  }
  return context;
}
