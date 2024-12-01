import { useEffect } from "react";
import { useGetListData } from "../api/getListData";
import { useStore } from "../store";
import AllCardsContainer from "./AllCardsContainer";
import { RefreshButton } from "./Buttons";
import DeletedCardsContainer from "./DeletedCardsContainer";
import { Spinner } from "./Spinner";
useStore;


export const Entrypoint = () => {
  const listQuery = useGetListData();
  const { setVisibleCards } = useStore();

  useEffect(() => {
    if (!listQuery.isLoading && listQuery.data) {
      setVisibleCards(listQuery.data?.filter(item => item.isVisible) ?? []);
    }
  }, [listQuery.data, listQuery.isLoading, setVisibleCards]);

  if (listQuery.isLoading) {
    return <Spinner />;
  }

  return (
    <div className="m-2">
      <RefreshButton />
      <div className="flex mt-5 gap-x-16">
        <AllCardsContainer />
        <DeletedCardsContainer />
      </div>
    </div>
  );
};
