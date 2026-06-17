import { asset } from "#/shared/asset";
import { classnames } from "#/shared/classnames";
import css from "./Price.module.css";

const Price = ({ cost, unaffordable, disabled }: PriceProps) => {
  const classNames = classnames({
    [css.value]: true,
    [css.unaffordable]: !disabled && unaffordable,
  });

  return (
    <div className={css.cost}>
      <img
        className={css.icon}
        src={asset("img/resource/law.png")}
        alt="law"
        draggable={false}
      />
      <span className={classNames}>{cost}</span>
    </div>
  );
};

export default Price;

type PriceProps = {
  cost: number;
  unaffordable: boolean;
  disabled: boolean;
};
