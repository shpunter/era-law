import { useLawsStore } from "#/features/laws/laws.store";
import { patchState } from "#/shared/lawBus";

// Call once at app startup. Returns the unsubscribe handle (unused for the app
// lifetime, but handy for tests/HMR).
export const initSendBack = () => {
  const publish = (s = useLawsStore.getState()) =>
    patchState({
      laws: { resource: s.resource, mine: s.mine, history: s.history },
    });

  // Seed the bus with the current snapshot so a late-mounting host gets it.
  publish();

  return useLawsStore.subscribe((state, prev) => {
    if (
      state.resource !== prev.resource ||
      state.mine !== prev.mine ||
      state.history !== prev.history
    ) {
      publish(state);
    }
  });
};
