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
      className="hover:text-gray-700 transition-colors flex items-center justify-center"
      onClick={() => {
        setIsOpen(prev => !prev);
      }}
      style={{
        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform 0.3s",
      }}
      {...props}
    >
      {children}
    </button>
  );
};

export const DeleteButton = ()=> {
  return (
    <button
      className="hover:text-gray-700 transition-colors flex items-center justify-center"
    >
      <XMarkIcon />
    </button>
  );
};
