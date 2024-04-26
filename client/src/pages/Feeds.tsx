import { CardsContainer } from "../components/CardsContainer";
import { useFeeds } from "../hooks/useFeeds";

export const Feeds = () => {
  const { data, isLoading } = useFeeds();

  if (isLoading) return <p>Loading...</p>;

  return <CardsContainer feeds={data} />;
};
