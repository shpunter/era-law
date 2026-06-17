import type { ResourceKey } from "#/shared/types";
import { create } from "zustand";
import type { LawBound } from "./calc";
import type { LawID, LawType } from "./laws.config";

// Recompute the unlock-limit bonus from history up to (and including) `upTo`:
// a law's level is how many times it appears, and any law granting a
// `bonus.limit` contributes that value at its level. Mirrors how Law.tsx sets
// the bonus when a law is enacted, so it stays correct after a reset removes
// some enactments.
const recomputeBonusLimit = (
  history: LawID[][],
  config: Partial<Record<LawID, LawType>>,
  upTo: number,
): number => {
  const levels = new Map<LawID, number>();
  let limit = 0;

  for (let day = 0; day <= upTo; day++) {
    const ids = history[day];

    if (!ids) continue;

    for (const id of ids) levels.set(id, (levels.get(id) ?? 0) + 1);
  }

  for (const [id, lvl] of levels) {
    const law = config[id];

    if (law && "bonus" in law && "limit" in law.bonus) {
      limit = law.bonus.limit({ lvl });
    }
  }

  return limit;
};

// `spent` is derived, not stored: the total law-point cost of every law enacted
// up to (and including) the viewed day. Counts the same range as the law levels
// in Law.tsx, so it tracks historyIDX automatically. Use as a selector:
//   const spent = useLawsStore(selectSpent);
export const selectSpent = (state: Store): number => {
  let spent = 0;
  // Per-law enactment count so each level draws its own entry from `cost[]`.
  const levels = new Map<LawID, number>();

  for (let day = 0; day <= state.historyIDX; day++) {
    const ids = state.history[day];

    if (!ids) continue;

    for (const id of ids) {
      const lvl = levels.get(id) ?? 0;
      spent += state.config[id]?.cost[lvl] ?? 0;
      levels.set(id, lvl + 1);
    }
  }

  return spent;
};

export const useLawsStore = create<Store & Action>((set) => ({
  config: {},
  history: [],
  resource: [],
  mine: [],
  historyIDX: 0,
  lower: null,
  higher: null,
  bonus: {
    limit: 0,
    law: 0,
  },

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
      };
    });
  },

  setBonus: (id, value) => {
    set((state) => {
      return {
        bonus: {
          ...state.bonus,
          [id]: value,
        },
      };
    });
  },

  reset: (arg) => {
    set((state) => {
      if (arg === "curr-day") {
        const { historyIDX, config } = state;

        // Wipe today's entry from each per-day timeline. `spent` is derived, so
        // it follows automatically.
        const history = structuredClone(state.history);
        const resource = structuredClone(state.resource);
        const mine = structuredClone(state.mine);

        history[historyIDX] = [];
        resource[historyIDX] = [];
        mine[historyIDX] = [];

        return {
          history,
          resource,
          mine,
          bonus: {
            limit: recomputeBonusLimit(history, config, historyIDX),
            law: 0,
          },
        };
      }

      return {
        history: [],
        resource: [],
        mine: [],
        bonus: {
          limit: 0,
          law: 0,
        },
      };
    });
  },
}));

type Store = {
  historyIDX: number;
  resource: { resID: ResourceKey; amount: number }[][];
  mine: { resID: ResourceKey; amount: number }[][];
  config: Partial<Record<LawID, LawType>>;
  history: LawID[][];
  lower: LawBound | null;
  higher: LawBound | null;
  bonus: {
    limit: number;
    law: number;
  };
};

type Action = {
  setHistoryIDX: (historyIDX: number) => void;
  setBracket: (lower: LawBound | null, higher: LawBound | null) => void;
  setConfig: (config: Partial<Record<LawID, LawType>>) => void;
  addLaw: (lawID: LawID) => void;
  setBonus: (id: "limit", value: number) => void;
  reset: (arg: "all" | "curr-day") => void;
};
