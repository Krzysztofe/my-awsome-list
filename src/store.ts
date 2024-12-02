import { create } from "zustand";
import { ListItem, DeletedListItem } from "./api/getListData";

type State = {
  visibleCards: ListItem[];
  deletedCards: DeletedListItem[];
  isOpen: Record<number, boolean>;
};

type Actions = {
  setVisibleCards: (cardsToPrint: ListItem[]) => void;
  setDeletedCards: (cardsToPrint: ListItem[]) => void;
  deleteCard: (id: number) => void;
  toggleCardOpen: (id: number) => void;
};

export const useStore = create<State & Actions>(set => ({
  visibleCards: [],
  deletedCards: [],
  isOpen: {},

  setVisibleCards: (cardsToPrint: ListItem[]) => {
    set(state => {
      const deletedCardsIds = state.deletedCards.map(item => item.id);
      const visibleCardsList = cardsToPrint.filter(
        item => !deletedCardsIds.includes(item.id)
      );

      return { visibleCards: visibleCardsList };
    });
  },
  setDeletedCards: (cardsToPrint: ListItem[]) => {
    set(state => {
      const visibleCardsIds = state.visibleCards.map(item => item.id);
      const deletedCardsList = cardsToPrint.filter(
        item => !visibleCardsIds.includes(item.id)
      );

      return { deletedCards: deletedCardsList };
    });
  },
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
