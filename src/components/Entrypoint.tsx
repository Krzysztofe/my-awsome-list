import { useEffect } from "react";
import { useGetListData } from "../api/getListData";
import { useStore } from "../store";
import AllCardsContainer from "./allCards/AllCardsContainer";
import { RefreshButton } from "./Buttons";
import DeletedCardsContainer from "./deletedCards/DeletedCardsContainer";
import { Spinner } from "./Spinner";
import ErrorPage from "./ErrorPage";

export const Entrypoint = () => {
  const listQuery = useGetListData();
  const { setVisibleCards, setDeletedCards } = useStore();

  useEffect(() => {
    if (!listQuery.isFetching && listQuery.data) {
      const cardsToPrint = listQuery.data?.filter(item => item.isVisible) ?? [];

      setVisibleCards(cardsToPrint);
      setDeletedCards(cardsToPrint);
    }
  }, [listQuery.data, listQuery.isFetching, setVisibleCards, setDeletedCards]);

  if (listQuery.isFetching) {
    return <Spinner />;
  }

  if (listQuery.isError) {
    return <ErrorPage />;
  }

  return (
    <div className="m-6">
      <RefreshButton onRefresh={listQuery.refetch} />
      <div className="flex mt-5 gap-x-16">
        <AllCardsContainer />
        <DeletedCardsContainer />
      </div>
    </div>
  );
};
