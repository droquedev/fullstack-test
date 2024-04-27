import { useEffect, useState } from "react";
import { getLanguages } from "../services/libre-translate.service";
import { Language } from "api/src/types/language";

export const useLanguages = () => {
  const [languages, setLanguages] = useState<Language[]>([]);

  useEffect(() => {
    const fetchLanguages = async () => {
      const languages = await getLanguages();
      setLanguages(languages);
    };

    fetchLanguages();
  }, []);

  return {
    languages,
  };
};
