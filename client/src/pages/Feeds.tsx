import dayjs, { Dayjs } from "dayjs";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { CardsContainer } from "../components/CardsContainer";
import { useFeeds } from "../hooks/useFeeds";
import { useLanguages } from "../hooks/useLanguages";

export const Feeds = () => {
  const { data, fetchFeeds, isFetching } = useFeeds();
  const { languages } = useLanguages();
  const [form, seForm] = useState<{
    date: Dayjs | null;
    language: string;
  }>({
    date: null,
    language: "en",
  });

  useEffect(() => {
    const handleScroll = () => {
      if (isFetching) return;

      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;

      const scrollPercentage =
        (scrollTop / (scrollHeight - clientHeight)) * 100;

      if (scrollPercentage >= 90) {
        const newDate = dayjs(form.date).add(1, "day");
        seForm((prev) => ({ ...prev, date: newDate }));
        window.removeEventListener("scroll", handleScroll);
        fetchFeeds(newDate, form.language);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [data, isFetching]);

  const handleInputChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) => {
    const { name, value } = e.target;

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

    fetchFeeds(date, language!);
  };

  const languageOptions = languages.map((lang) => (
    <option key={lang.code} value={lang.code}>
      {lang.name}
    </option>
  ));

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="date"
          name="date"
          id="date"
          onChange={handleInputChange}
          value={form.date?.format("YYYY-MM-DD") || ""}
        />
        <select
          id="language"
          name="language"
          onChange={handleInputChange}
          value={form.language}
        >
          {languageOptions}
        </select>
        <button type="submit">Submit</button>
      </form>
      <CardsContainer feeds={data} />
      {isFetching && <div className="loader" />}
    </>
  );
};
