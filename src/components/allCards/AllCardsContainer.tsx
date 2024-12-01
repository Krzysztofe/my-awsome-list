import { AllCards } from "./AllCards";
import ListHeader from "../ListHeader";
import { useStore } from "../../store";
import CardsColumnContainer from "../CardsColumnContainer";

const AllCardsContainer = () => {
  const { visibleCards } = useStore();

  return (
    <CardsColumnContainer>
      <ListHeader text={"My Awesome List"} counter={visibleCards.length} />
      <AllCards />
    </CardsColumnContainer>
  );
};

export default AllCardsContainer;
