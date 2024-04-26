import { Card } from "./Card";

interface Props {
  feeds: any[];
}

export const CardsContainer = ({ feeds }: Props) => {
  return (
    <div className="cards-container">
      {feeds.map((feed) => (
        <Card key={feed.id} feed={feed} />
      ))}
    </div>
  );
};
