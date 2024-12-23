import { FC, ReactNode } from "react";

type CardsContainerProps = {
  children?: ReactNode;
};

const CardsContainer: FC<CardsContainerProps> = ({ children }) => {
  return <div className="w-full max-w">{children}</div>;
};
export default CardsContainer;
