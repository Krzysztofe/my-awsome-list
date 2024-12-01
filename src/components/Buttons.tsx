import { FC } from "react";
import { XMarkIcon } from "./icons";

type ExpandButtonProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
};

export const ExpandButton: FC<ExpandButtonProps> = ({
  isOpen,
  setIsOpen,
  children,
  ...props
}) => {
  return (
    <button
      className="hover:text-blue-700 transition-colors flex items-center justify-center"
      onClick={() => {
        setIsOpen(prev => !prev);
      }}
      style={{
        transform: isOpen ? "rotate(0deg)" : "rotate(180deg)",
        transition: "transform 0.3s",
      }}
      {...props}
    >
      {children}
    </button>
  );
};

type DeleteButtonProps = {
  id: number;
  handleDeleteCard: (id: number) => void;
};

export const DeleteButton: FC<DeleteButtonProps> = ({
  id,
  handleDeleteCard,
}) => {
  return (
    <button
      className="hover:text-gray-700 transition-colors flex items-center justify-center"
      onClick={() => {
        handleDeleteCard(id);
      }}
    >
      <XMarkIcon />
    </button>
  );
};

type ToggleButtonProps = {
  isReveal: boolean;
  deleteCardsLength: number;
  handleReveal: () => void;
};

const buttonGenericStyles =
  "text-white text-sm transition-colors hover:bg-gray-800 disabled:bg-black/75 bg-black rounded px-3 py-1";

export const ToggleButton: FC<ToggleButtonProps> = ({
  isReveal,
  deleteCardsLength,
  handleReveal,
}) => {
  return (
    <button
      disabled={deleteCardsLength === 0 && true}
      className={buttonGenericStyles}
      onClick={handleReveal}
    >
      {!isReveal ? "Reveal" : "Revert"}
    </button>
  );
};

export const RefreshButton = () => {
  return <button className={buttonGenericStyles}>Refresh</button>;
};
