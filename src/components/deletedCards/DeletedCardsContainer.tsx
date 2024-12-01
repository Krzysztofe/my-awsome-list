import { useState } from "react";
import { useStore } from "../../store";
import { ToggleButton } from "../Buttons";
import DeletedCards from "./DeletedCards";
import ListHeader from "../ListHeader";
import CardsColumnContainer from "../CardsColumnContainer";

const DeletedCardsContainer = () => {
  const { deletedCards } = useStore();
  const [isReveal, setReveal] = useState(false);

  return (
    <CardsColumnContainer>
      <div className="flex items-center justify-between">
        <ListHeader text={"Deleted Cards"} counter={deletedCards.length} />
        <ToggleButton isReveal={isReveal} setReveal={setReveal} />
      </div>

        {isReveal && <DeletedCards />}
   
    </CardsColumnContainer>
  );
};

export default DeletedCardsContainer;
