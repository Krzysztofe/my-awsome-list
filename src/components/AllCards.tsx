import { FC, useState } from "react";
import { DeleteButton, ExpandButton } from "./Buttons";
import { ChevronUpIcon } from "./icons";
import CartDescription from "./CartDescription";
import { useStore } from "../store";

export const AllCards = () => {
  const { visibleCards } = useStore();
  const [isOpenState, setIsOpenState] = useState<Record<number, boolean>>({});

  const toggleCardOpen = (id: number) => {
    setIsOpenState(prevState => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <div className="flex flex-col gap-y-3">
      {visibleCards.map(card => {
        const isOpenDescription = isOpenState[card.id] || false;
        return (
          <div key={card.id} className="border border-black px-2 py-1.5">
            <div className="flex justify-between mb-0.5">
              <h1 className="font-medium">{card.title}</h1>

              <div className="flex">
                <ExpandButton
                  isOpenDescription={isOpenDescription}
                  toggleCardOpen={() => toggleCardOpen(card.id)}
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
