import { useEffect } from "react";
import { useGetListData } from "../api/getListData";
import { useStore } from "../store";
import AllCardsContainer from "./allCards/AllCardsContainer";
import { RefreshButton } from "./Buttons";
import DeletedCardsContainer from "./deletedCards/DeletedCardsContainer";
import { Spinner } from "./Spinner";
import { ListItem } from "../api/getListData";

export const Entrypoint = () => {
  const listQuery = useGetListData();
  const { setVisibleCards, visibleCards, deletedCards } = useStore();

  useEffect(() => {
    if (!listQuery.isFetching && listQuery.data) {
      const queriedDataToPrint =
        listQuery.data?.filter(item => item.isVisible) ?? [];

      const combined = [...visibleCards, ...queriedDataToPrint];
      const deletedIds = new Set(deletedCards.map(item => item.id));
      const uniqueIds = [...new Set(combined.map(item => item.id))];

      const combinedDataToPrint = uniqueIds
        .map(id => combined.find(item => item.id === id))
        .filter((item): item is ListItem => item !== undefined)
        .filter(item => !deletedIds.has(item.id));

      setVisibleCards(combinedDataToPrint);
    }
  }, [listQuery.data, listQuery.isFetching, setVisibleCards]);

  if (listQuery.isFetching) {
    return <Spinner />;
  }

  return (
    <div className="m-6">
      <RefreshButton
        onRefresh={() => {
          listQuery.refetch();
        }}
      />
      <div className="flex mt-5 gap-x-16">
        <AllCardsContainer />
        <DeletedCardsContainer />
      </div>
    </div>
  );
};
