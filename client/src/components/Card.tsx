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

  let imageSrc =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Wikipedia-logo-v2-en.svg/892px-Wikipedia-logo-v2-en.svg.png";

  if (feed.thumbnail) {
    imageSrc = feed.thumbnail.source;
  }

  return (
    <article
      className={`card ${visited[feed.id] ? "visited" : ""}`}
      onClick={onClick}
    >
      <div className="image-container">
        <img src={imageSrc} alt={feed.title} />
      </div>
      <div className="content">
        <span className="date">{dayjs(feed.date).format("MM/DD/YYYY")}</span>
        <h1 className="title">{feed.title}</h1>
        <p className="description">{feed.description}</p>
      </div>
    </article>
  );
};
