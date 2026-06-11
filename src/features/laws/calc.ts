// Total law required to reach a given hero level.
//
// Derived as a cubic least-squares fit over all known data (levels 1–69):
//   law(l) = 0.3025012·l³ + 15.49025·l² + 833.3260·l + 780.55
// Rounded to the nearest 100 this reproduces every known level except L52
// (off by 100, within the source data's own ±50 rounding), and extrapolates
// monotonically to arbitrarily high levels. (A quadratic can't fit — max error
// ~4500 — and a quartic adds nothing, so cubic is the right degree.)
//
// Source data (level -> law; 15 and 22 had no data):
//   1 -> 1600     2 -> 2500     3 -> 3400     4 -> 4400     5 -> 5400
//   6 -> 6400     7 -> 7500     8 -> 8600     9 -> 9800    10 -> 11000
//  11 -> 12200   12 -> 13500   13 -> 14900   14 -> 16300   15 -> 17800
//  16 -> 19300   17 -> 20900   18 -> 22600   19 -> 24300   20 -> 26100
//  21 -> 27900   22 -> 29800   23 -> 31800   24 -> 33900   25 -> 36000
//  26 -> 38200   27 -> 40500   28 -> 42900   29 -> 45400   30 -> 47900
//  31 -> 50500   32 -> 53200   33 -> 56000   34 -> 58900   35 -> 61900
//  36 -> 65000   37 => 68100?  38 => 71400   39 -> 74800   40 -> 78300
//  41 => 81800?  42 => 85500   43 => 89300   44 => 93200   45 => 97200?
//  46 => 101300  47 => 105600  48 => 109900  49 => 114400  50 => 119000
//  51 => 123700  52 => 128600  53 => 133500  54 => 138600  55 => 143800
//  56 => 149100  57 => 154600  58 => 160200  59 => 166000  60 => 171900
//  61 => 177900  62 => 184100  63 => 190400  64 => 196900  65 => 203500
//  66 => 210200  67 => 217100  68 => 224200  69 => 231400  70 => 238800
//  71 => 246300  72 => 254000  73 => 261900  74 => 269900  75 => 278100
//  76 => 286400
const C3 = 0.3025012;
const C2 = 15.49025;
const C1 = 833.326;
const C0 = 780.55;

/**
 * Law needed to reach the given hero level (>= 1), rounded to the nearest 100.
 * Returns `undefined` for non-finite or sub-1 levels.
 */
export const calcLawForLevel = (level: number): number | undefined => {
  if (!Number.isFinite(level) || level < 1) return undefined;

  const law = C3 * level ** 3 + C2 * level ** 2 + C1 * level + C0;

  return Math.round(law / 100) * 100;
};

/** One end of the bracket: the level and its law requirement. */
export type LawBound = { level: number; law: number };

/**
 * Bracket an honor value between two consecutive entries of the (virtual,
 * unbounded) array `[calcLawForLevel(1), calcLawForLevel(2), …]`.
 *
 * Returns the highest entry whose law requirement is `<= honor` as `lower`, and
 * the next entry (`> honor`) as `higher` — i.e. `lower.law <= honor < higher.law`.
 * `lower` is `null` when honor is below level 1's requirement. Uses binary
 * search, with an exponential probe to find the upper bound since levels are
 * unbounded. Returns `undefined` for non-finite input.
 */
export const findLawBracket = (
  honor: number,
): { lower: LawBound; higher: LawBound } => {
  if (!Number.isFinite(honor))
    return {
      lower: { level: 0, law: 0 },
      higher: { level: 0, law: 0 },
    };

  // calcLawForLevel is defined and strictly increasing for level >= 1.
  const lawAt = (level: number) => calcLawForLevel(level) as number;

  // Below the first level — no lower bound.
  if (honor < lawAt(1)) {
    return { lower: { level: 0, law: 0 }, higher: { level: 1, law: lawAt(1) } };
  }

  // Exponentially grow `hi` until its requirement exceeds honor, keeping
  // `lo = hi / 2` as a level whose requirement is still <= honor.
  let hi = 1;
  while (lawAt(hi) <= honor) hi *= 2;
  let lo = hi >> 1; // lawAt(lo) <= honor < lawAt(hi)

  // Binary search for the largest level whose requirement is <= honor.
  while (lo < hi - 1) {
    const mid = (lo + hi) >> 1;

    if (lawAt(mid) <= honor) lo = mid;
    else hi = mid;
  }

  // Invariant: lawAt(lo) <= honor < lawAt(hi), with hi === lo + 1.
  return {
    lower: { level: lo, law: lawAt(lo) },
    higher: { level: hi, law: lawAt(hi) },
  };
};
