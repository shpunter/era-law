import { classnames } from "#/shared/classnames";
import type { LawType } from "../../laws.config";
import css from "./Price.module.css";

const Price = ({ law, unaffordable, disabled }: PriceProps) => {
  const classNames = classnames({
    [css.value]: true,
    [css.unaffordable]: !disabled && unaffordable,
  });

  return (
    <div className={css.cost}>
      <img
        className={css.icon}
        src="/img/resource/law.png"
        alt="law"
        draggable={false}
      />
      <span className={classNames}>{law.cost}</span>
    </div>
  );
};

export default Price;

type PriceProps = {
  law: LawType;
  unaffordable: boolean;
  disabled: boolean;
};
