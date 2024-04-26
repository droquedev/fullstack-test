import { useInViewport } from "@mantine/hooks";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { useFeeds } from "../hooks/useFeeds";
import { CardsContainer } from "../components/CardsContainer";

export const Feeds = () => {
  const [date, setDate] = useState(dayjs("2021-01-01"));
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
