import { useLawsStore } from "#/features/laws/laws.store";
import { state$ } from "#/shared/lawBus";
import { useObservable } from "#/shared/useObservable";
import css from "./LawLvlBar.module.css";

const LawLvlBar = () => {
  const { resLaw } = useObservable(state$, state$.getValue());
  const lower = useLawsStore((state) => state.lower);
  const higher = useLawsStore((state) => state.higher);
  const spent = useLawsStore((state) => state.spent);

  if (!lower || !higher) return null;

  const span = higher.law - lower.law;

  const pct =
    span > 0
      ? Math.min(100, Math.max(0, ((resLaw - lower.law) / span) * 100))
      : 0;

  return (
    <div className={css.lawBar}>
      <div className={css.left}>
        <img
          className={css.icon}
          src="/img/resource/law.png"
          alt="law"
          draggable={false}
        />
        {lower.level - spent}
      </div>
      <div className={css.level}>{lower.level}</div>
      <div className={css.bar}>
        <div className={css.fill} style={{ width: `${pct}%` }} />
        <span className={css.value}>
          {resLaw} / {higher.law}
        </span>
      </div>
      <div className={css.level}>{higher.level}</div>
    </div>
  );
};

export default LawLvlBar;
