import { useStore } from "../store";

const DeletedCards = () => {
  const { deletedCards } = useStore();

  return (
    <div className="flex flex-col gap-y-3">
      {deletedCards.map(card => {
        return (
          <div className="border border-black px-2 py-1.5 ">
            <div className="flex justify-between mb-0.5">
              <h1 className="font-medium">{card.title}</h1>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DeletedCards;
