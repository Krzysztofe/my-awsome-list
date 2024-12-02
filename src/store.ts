import { create } from "zustand";
import { ListItem, DeletedListItem } from "./api/getListData";

type State = {
  visibleCards: ListItem[];
  deletedCards: DeletedListItem[];
  isOpen: Record<number, boolean>;
};

type Actions = {
  setVisibleCards: (cards: ListItem[]) => void;
  deleteCard: (id: number) => void;
  toggleCardOpen: (id: number) => void;
};

export const useStore = create<State & Actions>(set => ({
  visibleCards: [],
  deletedCards: [],
  isOpen: {},

  setVisibleCards: cards => set({ visibleCards: cards }),
  deleteCard: id =>
    set(state => {
      const cardToDelete = state.visibleCards.find(card => card.id === id);
      if (!cardToDelete) return state;
      return {
        visibleCards: state.visibleCards.filter(card => card.id !== id),
        deletedCards: [...state.deletedCards, { ...cardToDelete }],
      };
    }),
  toggleCardOpen: id =>
    set(state => ({
      isOpen: {
        ...state.isOpen,
        [id]: !state.isOpen[id],
      },
    })),
}));
