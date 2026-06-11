import { useLawsStore } from "../laws/laws.store";
import css from "./LawGate.module.css";

const LawGate = ({ goal, row }: LawGateProps) => {
  const spent = useLawsStore((state) => state.spent);

  return (
    spent < goal && (
      <div className={css.progress} style={{ top: `${row * 67 + 140}px` }}>
        {spent}/{goal}
      </div>
    )
  );
};

export default LawGate;

type LawGateProps = {
  goal: number;
  row: number;
};
