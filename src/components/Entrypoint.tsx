import { useEffect, useState } from "react";
import { ListItem, useGetListData } from "../api/getListData";
import { Card } from "./List";
import { Spinner } from "./Spinner";

type DeletedListItem = {
  id: number;
  title: string;
  description: string;
  isVisible: boolean;
};

export const Entrypoint = () => {
  const [visibleCards, setVisibleCards] = useState<ListItem[]>([]);
  const [deletedCards, setDeletedCards] = useState<DeletedListItem[]>([]);
  const listQuery = useGetListData();

  const handleDeleteCard = (id: number) => {
    const deletedCard = [...visibleCards].find((card: DeletedListItem) => {
      return card.id === id;
    });

    if (!deletedCard) return;

console.log("", deletedCard);

    setDeletedCards(prevDeletedCards => [
      ...prevDeletedCards,
      {
        id: deletedCard.id,
        title: deletedCard.title,
        description: deletedCard.description,
        isVisible: deletedCard.isVisible,
      },
    ]);

    setVisibleCards(


      [...visibleCards].filter((card: DeletedListItem) => {
        return card.id !== id;
      })
    );
  };

  console.log("", deletedCards);

  // TOOD
  // const deletedCards: DeletedListItem[] = [];

  useEffect(() => {
    if (listQuery.isLoading) {
      return;
    }

    setVisibleCards(listQuery.data?.filter(item => item.isVisible) ?? []);
  }, [listQuery.data, listQuery.isLoading]);

  if (listQuery.isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex gap-x-16">
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
          <button
            disabled
            className="text-white text-sm transition-colors hover:bg-gray-800 disabled:bg-black/75 bg-black rounded px-3 py-1"
          >
            Reveal
          </button>
        </div>
        <div className="flex flex-col gap-y-3">
          {/* {deletedCards.map((card) => (
            <Card key={card.id} card={card} />
          ))} */}
        </div>
      </div>
    </div>
  );
};
