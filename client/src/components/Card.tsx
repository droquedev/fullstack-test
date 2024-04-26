export const Card = ({ feed }: { feed: any }) => {
  return (
    <div className="card">
      {feed.thumbnail && <img src={feed.thumbnail.source} alt={feed.title} />}
      <h2>{feed.title}</h2>
      <p>{feed.description}</p>
    </div>
  );
};
