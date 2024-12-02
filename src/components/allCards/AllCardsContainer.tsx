import { useStore } from "../../store";
import CardsColumnContainer from "../CardsColumnContainer";
import ListHeader from "../ListHeader";
import { AllCards } from "./AllCards";

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
