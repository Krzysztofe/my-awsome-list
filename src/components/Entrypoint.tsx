import { useEffect, useState } from "react";
import { ListItem, useGetListData } from "../api/getListData";
import { Card } from "./List";
import { Spinner } from "./Spinner";
import { RefreshButton, ToggleButton } from "./Buttons";


type DeletedListItem = {
  id: number;
  title: string;
  description: string;
  isVisible: boolean;
};

export const Entrypoint = () => {
  const [visibleCards, setVisibleCards] = useState<ListItem[]>([]);
  const [deletedCards, setDeletedCards] = useState<DeletedListItem[]>([]);
  const [isReveal, setReveal] = useState(false);
  const listQuery = useGetListData();

  // TOOD
  // const deletedCards: DeletedListItem[] = [];

  useEffect(() => {
    if (listQuery.isLoading) {
      return;
    }

    setVisibleCards(listQuery.data?.filter(item => item.isVisible) ?? []);
  }, [listQuery.data, listQuery.isLoading]);


  const handleDeleteCard = (id: number) => {
    const deletedCard = [...visibleCards].find((card: DeletedListItem) => {
      return card.id === id;
    });

    if (!deletedCard) return;

    setDeletedCards(prevDeletedCards => [...prevDeletedCards, deletedCard]);

    setVisibleCards(
      [...visibleCards].filter((card: DeletedListItem) => {
        return card.id !== id;
      })
    );
  };

  const handleReveal = () => {
    setReveal(prev => !prev);
  };




  if (listQuery.isLoading) {
    return <Spinner />;
  }

  return (
    <div className = "m-2">
      <RefreshButton />
      <div className="flex mt-5 gap-x-16">
        <div className="w-full max-w-xl">
          <h1 className="mb-1 font-medium text-lg">
            My Awesome List ({visibleCards.length})
          </h1>
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
        <div className="w-full max-w-xl">
          <div className="flex items-center justify-between">
            <h1 className="mb-1 font-medium text-lg">
              Deleted Cards ({deletedCards.length})
            </h1>

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
      </div>
    </div>
  );
};
