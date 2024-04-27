import axios from "axios";

type GetFeedParams = {
  day: number;
  month: number;
  year: number;
};
export const getFeeds = async (params: GetFeedParams) => {
  try {
    const { data } = await axios.get<any>(
      "http://192.168.68.116:3000/api/feed",
      {
        params,
      },
    );
    return data;
  } catch (error) {
    return [];
  }
};
