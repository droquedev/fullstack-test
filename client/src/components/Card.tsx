import dayjs from "dayjs";
import { useVisitedContext } from "../hooks/useVisitedContext";
import { Feed } from "api/src/feed/feed.entity";

interface CardProps {
  feed: Feed;
}

export const Card = ({ feed }: CardProps) => {
  const { visited, addVisited } = useVisitedContext();

  const onClick = () => {
    const { url, id } = feed;
    window.open(url, "_blank");
    addVisited(id);
  };

  return (
    <article
      className={`card ${visited[feed.id] ? "visited" : ""}`}
      onClick={onClick}
    >
      <div className="image-container">
        {feed.thumbnail && <img src={feed.thumbnail.source} alt={feed.title} />}
      </div>
      <div className="content">
        <span className="date">{dayjs(feed.date).format("MM/DD/YYYY")}</span>
        <h1 className="title">{feed.title}</h1>
        <p className="description">{feed.description}</p>
      </div>
    </article>
  );
};
