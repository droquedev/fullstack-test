import axios from "axios";
import { Language } from "../types";

export const getLanguages = async (): Promise<Language[]> => {
  try {
    const { data } = await axios.get<Language[]>(
      "https://libretranslate.com/languages",
    );
  
    return data;
  } catch (error) {
    return [];
  }
};
