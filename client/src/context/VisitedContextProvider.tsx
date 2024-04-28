import { createContext, useState } from "react";

export const VisitedContext = createContext<{
  visited: Record<string, boolean>;
  addVisited: (id: string) => void;
}>({
  visited: {},
  addVisited: () => {},
});

interface VisitedContextProviderProps {
  children: React.ReactNode;
}

export const VisitedContextProvider = ({
  children,
}: VisitedContextProviderProps) => {
  const [visited, setVisited] = useState<Record<string, boolean>>(() => {
    const visitedDict = localStorage.getItem("visited");
    if (!visitedDict) return {};

    return JSON.parse(visitedDict);
  });

  const addVisited = (id: string) => {
    const newState = { ...visited, [id]: true };
    setVisited(newState);
    localStorage.setItem("visited", JSON.stringify(newState));
  };

  const value = {
    visited,
    addVisited,
  };

  return (
    <VisitedContext.Provider value={value}>{children}</VisitedContext.Provider>
  );
};
