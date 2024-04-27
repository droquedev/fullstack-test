import axios from "axios";

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

    const { data } = await axios.get<any>(
      `http://192.168.68.116:3000/${endpoint}`,
      {
        params,
      },
    );
    return data;
  } catch (error) {
    return [];
  }
};
