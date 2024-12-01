import { useEffect } from "react";
import { useGetListData } from "../api/getListData";
import { useStore } from "../store";
import AllCardsContainer from "./allCards/AllCardsContainer";
import { RefreshButton } from "./Buttons";
import DeletedCardsContainer from "./deletedCards/DeletedCardsContainer";
import { Spinner } from "./Spinner";

export const Entrypoint = () => {
  const listQuery = useGetListData();
  const { setVisibleCards, clearDeletedCards } = useStore();

  useEffect(() => {
    if (!listQuery.isFetching && listQuery.data) {
      setVisibleCards(listQuery.data?.filter(item => item.isVisible) ?? []);
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
          clearDeletedCards();
        }}
      />
      <div className="flex mt-5 gap-x-16">
        <AllCardsContainer />
        <DeletedCardsContainer />
      </div>
    </div>
  );
};
