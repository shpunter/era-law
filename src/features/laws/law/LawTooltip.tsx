import type { LawType } from "../laws.config";
import css from "./law.module.css";

const describe = (law: LawType, lvl: number) =>
  (law.description as (ctx: { lvl: number; sight: number }) => string)({
    lvl,
    sight: 1,
  });

const LawTooltip = ({ law, lawLvl }: LawTooltipProps) => {
  const isMax = lawLvl >= law.max;
  const isUpgrade = lawLvl > 0 && !isMax;

  return (
    <>
      <strong className={css.tooltipTitle}>{law.title}</strong>

      {isUpgrade && (
        <div className={css.currentLVL}>
          <p>Level: {lawLvl}</p><br/>
          <p>{describe(law, lawLvl)}</p>
          <p className={css.nextLabel}>After improvement</p>
        </div>
      )}

      <p className={isMax ? css.currentLVL : css.tooltipBody}>
        {describe(law, lawLvl + 1)}
      </p>
    </>
  );
};

export default LawTooltip;

type LawTooltipProps = {
  law: LawType;
  lawLvl: number;
};
