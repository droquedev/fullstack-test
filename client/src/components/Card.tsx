export const Card = ({ feed }: { feed: any }) => {
  return (
    <article className="card">
      <div className="image-container">
        {feed.thumbnail && <img src={feed.thumbnail.source} alt={feed.title} />}
      </div>
      <div className="content">
        <h2 className="title">{feed.title}</h2>
        <p className="description">{feed.description}</p>
      </div>
    </article>
  );
};
