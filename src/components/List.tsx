import { FC, useState } from "react";
import { ListItem } from "../api/getListData";
import { DeleteButton, ExpandButton } from "./Buttons";
import { ChevronUpIcon } from "./icons";
import CartDescription from "./CartDescription";

type CardProps = {
  title: ListItem["title"];
  description: ListItem["description"];
  id: ListItem["id"];
  handleDeleteCard: (id: number) => void;
  isReveal?: boolean;
};

export const Card: FC<CardProps> = ({
  title,
  description,
  id,
  handleDeleteCard,
  isReveal,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-black px-2 py-1.5 ">
      <div className="flex justify-between mb-0.5">
        <h1 className="font-medium">{title}</h1>

        {!isReveal && (
          <div className="flex">
            <ExpandButton isOpen={isOpen} setIsOpen={setIsOpen}>
              <ChevronUpIcon />
            </ExpandButton>
            <DeleteButton id={id} handleDeleteCard={handleDeleteCard} />
          </div>
        )}
      </div>
      {!isReveal && (
        <CartDescription description={description} isOpen={isOpen} />
      )}
    </div>
  );
};
