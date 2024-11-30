import { FC } from "react";
import { XMarkIcon } from "./icons";

type ExpandButtonProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
};

type DeleteButtonProps = {
  id: number;
  handleDeleteCard: (id: number) => void;
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

export const DeleteButton: FC<DeleteButtonProps> = ({ id, handleDeleteCard }) => {
  return (
    <button
      className="hover:text-gray-700 transition-colors flex items-center justify-center"
      onClick={(() => { handleDeleteCard (id)})}
    >
      <XMarkIcon />
    </button>
  );
};
