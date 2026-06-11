import { asset } from "#/shared/asset";
import { selectSpent, useLawsStore } from "../laws/laws.store";
import css from "./LawGate.module.css";

const LawGate = ({ goal, row }: LawGateProps) => {
  const spent = useLawsStore(selectSpent);
  const bonusLimit = useLawsStore((state) => state.bonus.limit);
  const goalWithBonus = goal - bonusLimit;

  return (
    spent < goalWithBonus && (
      <>
        <div className={css.progress} style={{ top: `${row * 67 + 140}px` }}>
          {spent}/{goalWithBonus}
        </div>
        <div className={css.lock} style={{ top: `${row * 67 + 112}px` }}>
          <img src={asset("img/svg/lock.svg")} alt="locked" draggable={false} />
        </div>
      </>
    )
  );
};

export default LawGate;

type LawGateProps = {
  goal: number;
  row: number;
};
