import { useEffect } from "react";
import Law from "#/features/laws/law/Law";
import { findLawBracket } from "#/features/laws/calc";
import { LAW_LAYOUT, LAWS } from "#/features/laws/laws.config";
import type { FactionID, LawID, LawType } from "#/features/laws/laws.config";
import { useLawsStore } from "#/features/laws/laws.store";
import { emit, events$, state$ } from "#/shared/lawBus";
import { useObservable } from "#/shared/useObservable";
import css from "#/features/laws/laws.module.css";
import LawLvlBar from "./features/LawLvlBar/LawLvlBar";
import LawGate from "./features/LawGate/LawGate";
import { initSendBack } from "./features/SendBack/sendBack";
import "./index.css";

export default function App() {
  const setConfig = useLawsStore((state) => state.setConfig);
  const setHistoryIDX = useLawsStore((state) => state.setHistoryIDX);
  const setBracket = useLawsStore((state) => state.setBracket);
  const reset = useLawsStore((state) => state.reset);
  const { historyIDX, resLaw, faction: factionRaw } = useObservable(
    state$,
    state$.getValue(),
  ).down;

  // The host publishes the faction; narrow it to one this remote has a law
  // config for, falling back to hive until those configs land.
  const faction: FactionID = factionRaw in LAWS ? (factionRaw as FactionID) : "hive";

  const laws: Partial<Record<LawID, LawType>> = LAWS[faction];
  const layout: { left: LawID[][]; right: LawID[][] } = LAW_LAYOUT[faction];

  useEffect(() => {
    setHistoryIDX(historyIDX ?? 0);
  }, [historyIDX, setHistoryIDX]);

  useEffect(() => {
    const bracket = findLawBracket(resLaw);

    setBracket(bracket?.lower ?? null, bracket?.higher ?? null);
  }, [resLaw, setBracket]);

  useEffect(() => {
    setConfig(laws);
    emit({ type: "law:ready" });
  }, [laws, setConfig]);

  // Mirror enacted-law outputs to the host over the bus. Uses a store
  // subscription (reads via getState, not component state) so updates never
  // re-render the board, and lives in the exposed `./App` graph so it runs when
  // federated — main.tsx never executes inside the host.
  useEffect(() => initSendBack(), []);

  useEffect(() => {
    const sub = events$.subscribe((e) => {
      if (e.type === "law:reset-all") reset("all");
      if (e.type === "law:reset-curr-day") reset("curr-day");
    });

    return () => sub.unsubscribe();
  }, [reset]);

  return (
    <div className={css.laws}>
      <div className={css.scroll}>
        <div className={`${css.side} ${css.left}`}>
          {layout.left.map((group) => (
            <div key={group.join()} className={css.group}>
              {group.map((lawID) => {
                const law = laws[lawID];
                return (
                  law && (
                    <Law key={lawID} law={law} factionID={faction} />
                  )
                );
              })}
            </div>
          ))}
        </div>
        <div className={`${css.side} ${css.right}`}>
          {layout.right.map((group) => (
            <div key={group.join()} className={css.group}>
              {group.map((lawID) => {
                const law = laws[lawID];
                return (
                  law && (
                    <Law key={lawID} law={law} factionID={faction} />
                  )
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <LawLvlBar />
      {[0, 5, 15, 30, 50].map((el, i) => {
        return <LawGate key={el} goal={el} row={i} />;
      })}
    </div>
  );
}
