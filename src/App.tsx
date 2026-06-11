import { useEffect } from "react";
import Law from "#/features/laws/law/Law";
import { findLawBracket } from "#/features/laws/calc";
import { LAW_LAYOUT, LAWS } from "#/features/laws/laws.config";
import { useLawsStore } from "#/features/laws/laws.store";
import { emit, state$ } from "#/shared/lawBus";
import { useObservable } from "#/shared/useObservable";
import css from "#/features/laws/laws.module.css";
import LawLvlBar from "./features/LawLvlBar/LawLvlBar";
import "./index.css";
import Lock from "./features/Lock/Lock";

const FACTION = "hive" as const;

export default function App() {
  const setConfig = useLawsStore((state) => state.setConfig);
  const setHistoryIDX = useLawsStore((state) => state.setHistoryIDX);
  const setBracket = useLawsStore((state) => state.setBracket);
  const { historyIDX, resLaw } = useObservable(state$, state$.getValue());

  const laws = LAWS[FACTION];
  const layout = LAW_LAYOUT[FACTION];

  useEffect(() => {
    setHistoryIDX(historyIDX ?? 0);
  }, [historyIDX, setHistoryIDX]);

  // Derive the law bracket from resLaw and mirror it into the store so any
  // component can read the current/next level without recomputing.
  useEffect(() => {
    const bracket = findLawBracket(resLaw);
    setBracket(bracket?.lower ?? null, bracket?.higher ?? null);
  }, [resLaw, setBracket]);

  useEffect(() => {
    setConfig(laws);
    emit({ type: "law:ready" });
  }, [laws, setConfig]);

  return (
    <div className={css.laws}>
      <div className={css.scroll}>
        <div className={`${css.side} ${css.left}`}>
          {layout.left.map((group) => (
            <div key={group.join()} className={css.group}>
              {group.map((lawID) => (
                <Law key={lawID} law={laws[lawID]} factionID={FACTION} />
              ))}
            </div>
          ))}
        </div>
        <div className={`${css.side} ${css.right}`}>
          {layout.right.map((group) => (
            <div key={group.join()} className={css.group}>
              {group.map((lawID) => (
                <Law key={lawID} law={laws[lawID]} factionID={FACTION} />
              ))}
            </div>
          ))}
        </div>
      </div>
      <LawLvlBar />
      {[0, 5, 15, 30, 50].map((el, i) => {
        return <Lock key={el} goal={el} row={i} />;
      })}
    </div>
  );
}
