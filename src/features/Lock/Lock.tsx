import { useLawsStore } from "../laws/laws.store";
import css from "./Lock.module.css";

const Lock = ({ goal, row }: LockProps) => {
  const spent = useLawsStore((state) => state.spent);

  return (
    spent < goal && (
      <div className={css.progress} style={{ top: `${row * 67 + 140}px` }}>
        {spent}/{goal}
      </div>
    )
  );
};

export default Lock;

type LockProps = {
  goal: number;
  row: number;
};
