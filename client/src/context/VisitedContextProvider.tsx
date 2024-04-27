import { createContext, useEffect, useState } from "react";

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
  const [visited, setVisited] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const visited = localStorage.getItem("visited");
    if (visited) {
      setVisited(JSON.parse(visited));
    }
  }, []);

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
