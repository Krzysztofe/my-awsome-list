import { FC } from "react";

type DescriptionProps = {
  description: string;
  isOpen: boolean;
 
};

const CartDescription: FC<DescriptionProps>  = ({description, isOpen}) => {
  return (
    <div
      className="grid"
      style={{
        gridTemplateRows: isOpen ? "0fr" : "1fr",
        transition: "grid-template-rows 0.5s",
      }}
    >
      <p className="text-sm  overflow-hidden">{description}</p>
    </div>
  );
};

export default CartDescription;
