import Tooltip from "#/components/tooltip/Tooltip";
import { asset } from "#/shared/asset";
import { classnames } from "#/shared/classnames";
import type { FactionID, LawType } from "../laws.config";
import { selectSpent, useLawsStore } from "../laws.store";
import css from "./law.module.css";
import LawTooltip from "./LawTooltip";
import Price from "./Price/Price";

const Law = ({ law, factionID }: { law: LawType; factionID: FactionID }) => {
  const addLaw = useLawsStore((state) => state.addLaw);
  const setBonus = useLawsStore((state) => state.setBonus);
  const historyIDX = useLawsStore((state) => state.historyIDX);
  const spent = useLawsStore(selectSpent);
  const level = useLawsStore((state) => state.lower?.level ?? 0);
  const bonusLimit = useLawsStore((state) => state.bonus.limit);

  const isDisabled = law.limit - bonusLimit > spent;

  const lawLvl = useLawsStore((state) => {
    let count = 0;

    for (let day = 0; day <= historyIDX; day++) {
      const dayLaws = state.history[day];

      if (!dayLaws) continue;

      for (const id of dayLaws) if (id === law.id) count++;
    }

    return count;
  });

  // Cost of the next level to enact.
  const cost = law.cost[lawLvl] ?? 0;
  const isUnaffordable = cost > level - spent;

  const isMax = lawLvl >= law.max;

  const dots = Array.from({ length: law.max }, (_, i) => ({
    id: `${law.img}-${i}`,
    filled: i < lawLvl,
  }));

  const onClick = () => {
    if (isMax || isDisabled || isUnaffordable) return;

    // if (law.id === "l010") {
    if ("bonus" in law && "limit" in law.bonus) {
      setBonus("limit", law.bonus.limit({ lvl: lawLvl + 1 }));
    }

    addLaw(law.id);
  };

  const classNames = classnames({
    [css.maxed]: isMax,
    [css.law]: true,
    [css.disabled]: isDisabled,
  });

  return (
    <Tooltip>
      <Tooltip.Trigger
        className={classNames}
        onClick={onClick}
        data-testid={`law-${law.id}`}
      >
        <div className={css.dots}>
          {dots.map((dot) => (
            <div
              key={dot.id}
              className={dot.filled ? css.dotFilled : css.dot}
            />
          ))}
        </div>
        <img
          className={css.image}
          src={asset(`img/laws/${factionID}/${law.img}`)}
          alt=""
          draggable={false}
        />
        {lawLvl < law.max && (
          <Price
            cost={cost}
            unaffordable={isUnaffordable}
            disabled={isDisabled}
          />
        )}
      </Tooltip.Trigger>
      <Tooltip.Content className={css.tooltip}>
        <LawTooltip law={law} lawLvl={lawLvl} />
      </Tooltip.Content>
    </Tooltip>
  );
};

export default Law;
