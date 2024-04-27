import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { CardsContainer } from "../components/CardsContainer";
import { useFeeds } from "../hooks/useFeeds";

export const Feeds = () => {
  const [date, setDate] = useState(dayjs("2004-02-04"));
  const { data, fetchFeeds, isFetching } = useFeeds();

  useEffect(() => {
    const handleScroll = () => {
      if (isFetching) return;

      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;

      const scrollPercentage =
        (scrollTop / (scrollHeight - clientHeight)) * 100;

      if (scrollPercentage >= 90) {
        const newDate = dayjs(date).add(1, "day");
        setDate(newDate);
        window.removeEventListener("scroll", handleScroll);
        fetchFeeds(newDate);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [data, isFetching]);

  return (
    <>
      <button onClick={() => fetchFeeds(date)}>X</button>
      <CardsContainer feeds={data} />
    </>
  );
};
