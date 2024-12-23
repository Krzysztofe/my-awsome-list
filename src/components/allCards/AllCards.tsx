import { useStore } from "../../store";
import { DeleteButton, ExpandButton } from "../Buttons";
import CartDescription from "./CartDescription";
import { ChevronUpIcon } from "../icons";



export const AllCards = () => {
  const { visibleCards, isOpen } = useStore();

  return (
    <div className="flex flex-col gap-y-3">
      {visibleCards.map(card => {
        const isOpenDescription = isOpen[card.id] || false;
        return (
          <div key={card.id} className="border border-black px-2 py-1.5">
            <div className="flex justify-between mb-0.5">
              <h3 className="font-medium">{card.title}</h3>

              <div className="flex">
                <ExpandButton
                  id={card.id}
                >
                  <ChevronUpIcon />
                </ExpandButton>
                <DeleteButton id={card.id} />
              </div>
            </div>

            <CartDescription
              description={card.description}
              isOpenDescription={isOpenDescription}
            />
          </div>
        );
      })}
    </div>
  );
};
