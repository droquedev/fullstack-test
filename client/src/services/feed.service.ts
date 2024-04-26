import axios from "axios";

type GetFeedParams = {
  day: number;
  month: number;
  year: number;
};
export const getFeeds = async (params: GetFeedParams) => {
  try {
    const { data } = await axios.get<any>("http://localhost:3000/api/feed", {
      params,
    });
    return data;
  } catch (error) {
    return [];
  }
};
