import { useContext } from "react";
import { VisitedContext } from "../context/VisitedContextProvider";

export const useVisitedContext = () => {
  return useContext(VisitedContext);
};
