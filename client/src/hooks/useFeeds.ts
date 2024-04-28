import { Feed } from "api/src/feed/feed.entity";
import { Dayjs } from "dayjs";
import { useCallback, useState } from "react";
import { getFeeds } from "../services/feed.service";

export const useFeeds = () => {
  const [data, setData] = useState<Feed[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  const fetchFeeds = useCallback(
    async (date: Dayjs, lang: string) => {
      if (isFetching) return;
      setIsFetching(true);

      const year = date.year();
      const month = date.month() + 1;
      const day = date.date();

      const params = { year, month, day, lang };
      const data = await getFeeds(params);
      setIsFetching(false);
      setData((prev) => prev.concat(data));
    },
    [isFetching],
  );

  const clearFeeds = () => {
    setData([]);
  };

  return {
    data,
    isFetching,
    clearFeeds,
    fetchFeeds,
  };
};
