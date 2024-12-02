import { useStore } from "../../store";
import { ReverthButton } from "../Buttons";


const DeletedCards = () => {
  const { deletedCards } = useStore();

  return (
    <div className="flex flex-col gap-y-3">
      {deletedCards.map(card => {
        return (
          <div key={card.id} className="border border-black px-2 py-1.5 ">
            <div className="flex justify-between mb-0.5">
              <h3 className="font-medium">{card.title}</h3>
              <ReverthButton />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DeletedCards;
