import dayjs, { Dayjs } from "dayjs";
import { FormEvent, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { CardsContainer } from "../components/CardsContainer";
import { DatePicker } from "../components/DatePicker";
import { Select } from "../components/Select";
import { useFeeds } from "../hooks/useFeeds";
import { useLanguages } from "../hooks/useLanguages";
import { HandleInputChange } from "../types";

export const Feeds = () => {
  const { data, fetchFeeds, isFetching, clearFeeds } = useFeeds();
  const { languages } = useLanguages();
  const [form, seForm] = useState<{
    date: Dayjs | null;
    language: string;
  }>({
    date: null,
    language: "en",
  });

  const lastFetchedDate = useRef<Dayjs | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (isFetching) return;

      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;

      const scrollPercentage =
        (scrollTop / (scrollHeight - clientHeight)) * 100;

      if (scrollPercentage >= 90) {
        const date = lastFetchedDate.current;
        const newDate = date!.add(1, "day");
        window.removeEventListener("scroll", handleScroll);
        fetchFeeds(newDate, form.language);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [data, isFetching]);

  const handleInputChange: HandleInputChange = (e) => {
    const { name, value } = e;

    let val: string | Dayjs | null = value;

    if (name === "date") {
      val = dayjs(value);
    }

    seForm((prev) => ({ ...prev, [name]: val }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { date, language } = form;

    if (!date) {
      toast.error("Please select a date", {});
      return;
    }
    lastFetchedDate.current = date;
    clearFeeds();
    fetchFeeds(date, language!);
  };

  const languageOptions = languages.map((lang) => ({
    label: lang.name,
    value: lang.code,
  }));

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <DatePicker
          value={form.date?.toISOString()}
          onChange={handleInputChange}
          name="date"
        />
        <Select
          options={languageOptions}
          value={form.language}
          name="language"
          onChange={handleInputChange}
        />
        <button className="button" type="submit">
          Search
        </button>
      </form>
      <CardsContainer feeds={data} />
      {isFetching && <div className="loader" />}
    </>
  );
};
