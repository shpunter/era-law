import type { ResourceKey } from "#/shared/types";
import { create } from "zustand";
import type { LawBound } from "./calc";
import type { FactionLaws, LawID, LawType } from "./laws.config";

export const useLawsStore = create<Store & Action>((set) => ({
  config: {},
  history: [],
  resource: [],
  mine: [],
  historyIDX: 0,
  spent: 0,
  lower: null,
  higher: null,

  setHistoryIDX: (historyIDX) => set({ historyIDX }),

  setBracket: (lower, higher) => set({ lower, higher }),

  setConfig: (config) => {
    set((state) => ({ ...state, config }));
  },

  addLaw: (lawID) => {
    set((state) => {
      const { historyIDX } = state;
      const history = structuredClone(state.history);

      history[historyIDX] ??= [];
      history[historyIDX].push(lawID);

      const law = state.config[lawID];

      const resource = structuredClone(state.resource);
      const mine = structuredClone(state.mine);

      if (law && "income" in law && law.income) {
        const entries = Object.entries(law.income).map(([resID, amount]) => ({
          resID: resID as ResourceKey,
          amount,
        }));

        if (law.incomeType === "once") {
          resource[historyIDX] ??= [];
          resource[historyIDX].push(...entries);
        }

        if (law.incomeType === "daily") {
          mine[historyIDX] ??= [];
          mine[historyIDX].push(...entries);
        }
      }

      return {
        ...state,
        history,
        resource,
        mine,
        spent: state.spent + (law?.cost ?? 0)
      };
    });
  },
}));

type Store = {
  spent: number;
  historyIDX: number;
  resource: { resID: ResourceKey; amount: number }[][];
  mine: { resID: ResourceKey; amount: number }[][];
  config: Partial<Record<LawID, LawType>>;
  history: LawID[][];
  lower: LawBound | null;
  higher: LawBound | null;
};

type Action = {
  setHistoryIDX: (historyIDX: number) => void;
  setBracket: (lower: LawBound | null, higher: LawBound | null) => void;
  setConfig: (config: FactionLaws) => void;
  addLaw: (lawID: LawID) => void;
};
