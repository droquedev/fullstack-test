import axios from "axios";
import { config } from "../config";

type GetFeedParams = {
  day: number;
  month: number;
  year: number;
  lang: string;
};
export const getFeeds = async ({ lang, ...params }: GetFeedParams) => {
  try {
    let endpoint = "api/feed";

    if (lang !== "en") {
      endpoint += `/${lang}`;
    }

    const { data } = await axios.get<any>(`${config.BE_BASE_URL}/${endpoint}`, {
      params,
    });

    return data;
  } catch (error) {
    return [];
  }
};
