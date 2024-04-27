import { useCallback, useState } from "react";
import { getFeeds } from "../services/feed.service";
import { Dayjs } from "dayjs";
import { Feed } from "api/src/feed/feed.entity";

export const useFeeds = () => {
  const [data, setData] = useState<Feed[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  const fetchFeeds = useCallback(
    async (date: Dayjs) => {
      if (isFetching) return;
      setIsFetching(true);
      const year = date.year();
      const month = date.month() + 1;
      const day = date.date();

      const params = { year, month, day };
      const data = await getFeeds(params);
      setIsFetching(false);
      setData((prev) => prev.concat(data));
    },
    [isFetching],
  );

  return {
    data,
    fetchFeeds,
    isFetching,
  };
};
