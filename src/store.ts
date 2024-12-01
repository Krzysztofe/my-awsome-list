import { create } from "zustand";
import { ListItem, DeletedListItem } from "./api/getListData";

type State = {
  visibleCards: ListItem[];
  deletedCards: DeletedListItem[];
};

type Actions = {
  setVisibleCards: (cards: ListItem[]) => void;
  deleteCard: (id: number) => void;
};

export const useStore = create<State & Actions>(set => ({
  visibleCards: [],
  deletedCards: [],

  setVisibleCards: cards => set({ visibleCards: cards }),
  deleteCard: id =>
    set(state => {
      const cardToDelete = state.visibleCards.find(card => card.id === id);
      if (!cardToDelete) return state;
      return {
        visibleCards: state.visibleCards.filter(card => card.id !== id),
        deletedCards: [
          ...state.deletedCards,
          { ...cardToDelete, description: undefined },
        ],
      };
    }),
}));
