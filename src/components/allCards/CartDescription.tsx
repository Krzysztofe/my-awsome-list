import { FC } from "react";

type DescriptionProps = {
  description: string;
  isOpenDescription: boolean;
};

const CartDescription: FC<DescriptionProps> = ({
  description,
  isOpenDescription,
}) => {
  return (
    <div
      className="grid"
      style={{
        gridTemplateRows: isOpenDescription ? "1fr" : "0fr",
        transition: "grid-template-rows 0.5s",
      }}
    >
      <p className="text-sm overflow-hidden">{description}</p>
    </div>
  );
};

export default CartDescription;
