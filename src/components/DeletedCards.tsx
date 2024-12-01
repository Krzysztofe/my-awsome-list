import { useState } from 'react';
import { ToggleButton } from './Buttons';
import { FC } from "react";
import { DeletedListItem } from './Entrypoint';
import { Card } from './List';
import ListHeader from './ListHeader';


type DeletedCardsProps = {
  deletedCards: DeletedListItem[];
  handleDeleteCard: any;
};


const DeletedCards: FC<DeletedCardsProps> = ({
  deletedCards,
  handleDeleteCard,
}) => {
  const [isReveal, setReveal] = useState(false);

  const handleReveal = () => {
    setReveal(prev => !prev);
  };

  return (
    <div className="w-full max-w-xl">
      <div className="flex items-center justify-between">
        <ListHeader text={"Deleted Cards"} counter={deletedCards.length} />
        <ToggleButton
          isReveal={isReveal}
          deleteCardsLength={deletedCards.length}
          handleReveal={handleReveal}
        />
      </div>

      <div className="flex flex-col gap-y-3">
        {isReveal &&
          deletedCards.map(card => (
            <Card
              key={card.id}
              title={card.title}
              description={card.description}
              id={card.id}
              handleDeleteCard={handleDeleteCard}
              isReveal={isReveal}
            />
          ))}
      </div>
    </div>
  );
};

export default DeletedCards;