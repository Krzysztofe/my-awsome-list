import { FC } from "react";

type ListHeaderProps = {
  text: string;
  counter: number;
};

const ListHeader: FC<ListHeaderProps> = ({ text, counter }) => {
  return (
    <h2 className="mb-1 font-medium text-lg">
      {text} ({counter})
    </h2>
  );
};

export default ListHeader;
