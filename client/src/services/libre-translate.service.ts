import { Language } from "api/src/types/language";
import axios from "axios";

export const getLanguages = async (): Promise<Language[]> => {
  try {
    const { data } = await axios.get<any>(
      "https://libretranslate.com/languages",
    );

    const response = data.map((item: Language) => ({
      code: item.code,
      name: item.name,
    }));

    return response;
  } catch (error) {
    return [];
  }
};
