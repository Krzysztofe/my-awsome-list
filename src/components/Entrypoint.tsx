import { useEffect, useState } from "react";
import { ListItem, useGetListData } from "../api/getListData";
import { Card } from "./List";
import { Spinner } from "./Spinner";
import { RefreshButton, ToggleButton } from "./Buttons";
import AllCards from "./AllCards";
import DeletedCards from "./DeletedCards";


export type DeletedListItem = {
  id: number;
  title: string;
  description: string;
  isVisible: boolean;
};

export const Entrypoint = () => {
  const [visibleCards, setVisibleCards] = useState<ListItem[]>([]);
  const [deletedCards, setDeletedCards] = useState<DeletedListItem[]>([]);
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

 

  if (listQuery.isLoading) {
    return <Spinner />;
  }

  return (
    <div className="m-2">
      <RefreshButton />
      <div className="flex mt-5 gap-x-16">
        <AllCards
          visibleCards={visibleCards}
          handleDeleteCard={handleDeleteCard}
        />
        <DeletedCards
          deletedCards={deletedCards}
          handleDeleteCard={handleDeleteCard}
        />
      </div>
    </div>
  );
};
