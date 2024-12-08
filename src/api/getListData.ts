import { useQuery } from "@tanstack/react-query";
import mockJson from "./mock.json";

export type ListItem = {
  id: number;
  title: string;
  description: string;
  isVisible: boolean;
};

export type DeletedListItem = Omit<ListItem, "description">;

const LIST_QUERY_KEY = ["list"];

export const useGetListData = () => {
  const query = useQuery({
    queryKey: LIST_QUERY_KEY,
    queryFn: async () => {
      try {
        await sleep(1000);
        if (!mockJson) {
          throw new Error("👀");
        }
        const mockData: Omit<ListItem, "isVisible">[] = mockJson;
        return shuffle(mockData).map(addVisibilityFlag);
      } catch (error) {
        console.error("An unexpected error occurred!", error);
      }
    },
  });

  return query;
};

const getRandomBoolean = () => Math.random() > 0.5;

const addVisibilityFlag = <T extends object>(
  item: T
): T & { isVisible: boolean } => ({
  ...item,
  isVisible: getRandomBoolean(),
});

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const shuffle = <T extends any[]>(array: T): T => {
  const copy = [...array] as T;

  for (let i = copy.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = copy[i];
    copy[i] = copy[j];
    copy[j] = temp;
  }
  return copy;
};
