import { FC } from "react";
import { XMarkIcon, RevertIcon } from "./icons";
import { useStore } from "../store";

export const ExpandButton: FC<{
  isOpenDescription: boolean;
  toggleCardOpen: () => void;
  children: React.ReactNode;
}> = ({ isOpenDescription, toggleCardOpen, children, ...props }) => {
  return (
    <button
      className="hover:text-blue-700 transition-colors flex items-center justify-center"
      onClick={toggleCardOpen}
      style={{
        transform: isOpenDescription ? "rotate(0deg)" : "rotate(180deg)",
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
};

export const DeleteButton: FC<DeleteButtonProps> = ({ id }) => {
  const { deleteCard } = useStore();

  return (
    <button
      className="hover:text-gray-700 transition-colors flex items-center justify-center"
      onClick={() => {
        deleteCard(id);
      }}
    >
      <XMarkIcon />
    </button>
  );
};

type ToggleButtonProps = {
  isReveal: boolean;
  setReveal: React.Dispatch<React.SetStateAction<boolean>>;
};

const buttonGenericStyles =
  "text-white text-sm transition-colors hover:bg-gray-800 disabled:bg-black/75 bg-black rounded px-3 py-1";

export const ToggleButton: FC<ToggleButtonProps> = ({
  isReveal,
  setReveal,
}) => {
  const { deletedCards } = useStore();

  const handleReveal = () => {
    setReveal(prev => !prev);
  };

  return (
    <button
      disabled={deletedCards.length === 0 && true}
      className={buttonGenericStyles}
      onClick={handleReveal}
    >
      {!isReveal ? "Reveal" : "Close"}
    
    </button>
  );
};

type RefreshButtonProps = {
  onRefresh: () => void;
};

export const RefreshButton: FC<RefreshButtonProps> = ({ onRefresh }) => {
  return (
    <button className={buttonGenericStyles} onClick={onRefresh}>
      Refresh
    </button>
  );
};


export const ReverthButton = () => {
  return (
    <button className={`${buttonGenericStyles} h-7`}>
      <RevertIcon />
    </button>
  );
};