import { useQuery } from "@tanstack/react-query";
import { getFeeds } from "../services/feed.service";

export const useFeeds = () => {
  const query = useQuery({
    queryKey: ["feeds"],
    queryFn: () => getFeeds({ day: 1, month: 1, year: 2021 }),
  });

  return query;
};
