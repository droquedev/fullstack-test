import dayjs from "dayjs";
import { FormEvent, useEffect, useState } from "react";
import { CardsContainer } from "../components/CardsContainer";
import { useFeeds } from "../hooks/useFeeds";

export const Feeds = () => {
  const [date, setDate] = useState(dayjs());
  const [language, setLanguage] = useState("en");

  const { data, fetchFeeds, isFetching } = useFeeds(language);

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
        fetchFeeds(newDate, language);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [data, isFetching]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchFeeds(date, language);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          value={date.format("YYYY-MM-DD")}
          onChange={(e) => setDate(dayjs(e.target.valueAsDate))}
        />
        <input
          type="text"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <CardsContainer feeds={data} />
    </>
  );
};
