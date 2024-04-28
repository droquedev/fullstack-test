import axios from "axios";
import { config } from "../config";
import { Feed } from "../types";

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

    const { data } = await axios.get<Feed[]>(`${config.BE_BASE_URL}/${endpoint}`, {
      params,
    });

    return data;
  } catch (error) {
    return [];
  }
};
