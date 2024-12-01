import { FC } from "react";
import { ListItem } from "../api/getListData";
import { Card } from "./List";
import ListHeader from "./ListHeader";

type AllCardsProps = {
  visibleCards: ListItem[];
  handleDeleteCard: any;
};

const AllCards: FC<AllCardsProps> = ({ visibleCards, handleDeleteCard }) => {
  return (
    <div className="w-full max-w-xl">
      <ListHeader text={"My Awesome List"} counter={visibleCards.length} />

      <div className="flex flex-col gap-y-3">
        {visibleCards.map(card => (
          <Card
            key={card.id}
            title={card.title}
            description={card.description}
            id={card.id}
            handleDeleteCard={handleDeleteCard}
          />
        ))}
      </div>
    </div>
  );
};

export default AllCards;
