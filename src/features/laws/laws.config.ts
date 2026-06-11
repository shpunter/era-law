export const LAWS = {
  hive: {
    l000: {
      id: "l000",
      cost: 1,
      max: 1,
      img: "l000.webp",
      incomeType: "once",
      income: {
        gold: 2500,
        wood: 5,
        ore: 5,
      },
      limit: 0,
      title: "Resource Riches I",
      description: () =>
        "Provides a one-time allotment of 2500 Gold, 5 Wood, and 5 Ore when enacted.",
    },
    l010: {
      id: "l010",
      cost: 1,
      max: 2,
      img: "l010.webp",
      incomeType: "none",
      limit: 0,
      bonus: {
        limit: ({ lvl }: LVL) => Math.min(4, lvl * 2),
      },
      title: "Laws of the Hive",
      description: ({ lvl }: LVL) =>
        `Requirements for unlocking higher-level Laws are reduced by ${Math.min(4, lvl * 2)}.`,
    },
    l020: {
      id: "l020",
      cost: 2,
      max: 3,
      img: "l020.webp",
      incomeType: "none",
      limit: 0,
      title: "Mana Devour",
      description: ({ lvl }: LVL) =>
        `Your heroes' spells const  -${Math.min(3, lvl)} mana`,
    },
    l030: {
      id: "l030",
      cost: 4,
      max: 1,
      img: "l030.webp",
      incomeType: "none",
      limit: 0,
      title: "Focus Reserves",
      description: () => "Start each battle with +1 Focus Charge(s).",
    },
    l100: {
      id: "l100",
      cost: 2,
      max: 3,
      img: "l100.webp",
      incomeType: "daily",
      income: {
        gold: 250,
      },
      limit: 5,
      title: "Tax Collectors",
      description: ({ lvl }: LVL) =>
        `Produces ${Math.min(750, lvl * 250)} Gold daily.`,
    },
    l110: {
      id: "l110",
      cost: 2,
      max: 2,
      img: "l110.webp",
      incomeType: "daily",
      income: {
        crystals: 1,
      },
      limit: 5,
      title: "Mining: Crystals",
      description: ({ lvl }: LVL) =>
        `Produces ${Math.min(2, lvl)} Crystal(s) daily.`,
    },
    l120: {
      id: "l120",
      cost: 3,
      max: 1,
      img: "l120.webp",
      incomeType: "none",
      limit: 5,
      title: "Hidden Desires",
      description: ({ sight }: Sight) =>
        `Your Hive heroes see exact information about neutral squads within ${3 * sight} squares.`,
    },
    l200: {
      id: "l200",
      cost: 2,
      max: 1,
      img: "l200.webp",
      incomeType: "once",
      income: {
        gold: 5000,
        wood: 10,
        ore: 10,
      },
      limit: 15,
      title: "Resource Riches II",
      description: () =>
        "Provides a one-time allotment of 5000 Gold, 10 Wood, and 10 Ore when enacted.",
    },
    l210: {
      id: "l210",
      cost: 4,
      max: 1,
      img: "l210.webp",
      incomeType: "none",
      limit: 15,
      title: "Natural Selection",
      description: () =>
        "External dwellings in an area that you control produce upgraded creatures.",
    },
    l220: {
      id: "l220",
      cost: 3,
      max: 1,
      img: "l220.webp",
      incomeType: "none",
      limit: 15,
      title: "Ancient Power",
      description: () => "Primal spells of your heroes gain 1 level(s).",
    },
    l300: {
      id: "l300",
      cost: 4,
      max: 2,
      img: "l300.webp",
      incomeType: "none",
      limit: 30,
      title: "Prosper and Flourish",
      description: ({ lvl }: LVL) =>
        `External dwellings increase respective creature growth in the cities by ${Math.min(100, lvl * 50)}.`,
    },
    l310: {
      id: "l310",
      cost: 3,
      max: 1,
      img: "l310.webp",
      incomeType: "none",
      limit: 30,
      title: "Beelzebub's Gaze",
      description: ({ sight }: Sight) =>
        `Your Hive heroes see exact information about enemy heroes and cities within ${3 * sight} squares.`,
    },
    l400: {
      id: "l400",
      cost: 4,
      max: 2,
      img: "l400.webp",
      incomeType: "none",
      limit: 50,
      title: "Evolve, Adapt, Overcome",
      description: ({ lvl }: LVL) =>
        `Upgrading your Hive creatures costs –${Math.min(20, lvl * 10)}% Gold. Recruiting upgraded creatures is discounted by the same amount.`,
    },
    l410: {
      id: "l410",
      cost: 3,
      max: 1,
      img: "l410.webp",
      incomeType: "once",
      income: {
        gold: 7500,
        wood: 15,
        ore: 15,
      },
      limit: 50,
      title: "Resource Riches III",
      description: () =>
        "Provides a one-time allotment of 7500 Gold, 15 Wood, and 15 Ore when enacted.",
    },
    l420: {
      id: "l420",
      cost: 3,
      max: 3,
      img: "l420.webp",
      incomeType: "none",
      limit: 50,
      title: "Hive Magic",
      description: ({ lvl }: LVL) =>
        `Your heroes deal +${Math.min(30, lvl * 10)}% Magic Damage.`,
    },
    l001: {
      id: "l001",
      cost: 2,
      max: 3,
      img: "l001.webp",
      incomeType: "none",
      limit: 0,
      title: "Hive Integration",
      description: ({ lvl }: LVL) =>
        `Friendly creatures gain ${Math.min(3, lvl)} Attack.`,
    },
    l011: {
      id: "l011",
      cost: 2,
      max: 3,
      img: "l011.webp",
      incomeType: "none",
      limit: 0,
      title: "Hive Reception",
      description: ({ lvl }: LVL) =>
        `Friendly creatures gain ${Math.min(3, lvl)} Defense.`,
    },
    l021: {
      id: "l021",
      cost: 3,
      max: 1,
      img: "l021.webp",
      incomeType: "none",
      limit: 0,
      title: "Hive Offsprings I",
      description: () => `Summoned Fire Larvae deal +100% Damage on death.`,
    },
    l101: {
      id: "l101",
      cost: 3,
      max: 2,
      img: "l101.webp",
      incomeType: "none",
      limit: 5,
      title: "Elite Parasites",
      description: ({ lvl }: LVL) =>
        `Parasite growth in your cities increases by 4. They gain ${Math.min(2, lvl)} HP.`,
    },
    l111: {
      id: "l111",
      cost: 3,
      max: 2,
      img: "l111.webp",
      incomeType: "none",
      limit: 5,
      title: "Elite Locusts",
      description: ({ lvl }: LVL) =>
        `Locust growth in your cities increases by 4. They gain ${Math.min(2, lvl)} Speed.`,
    },
    l121: {
      id: "l121",
      cost: 3,
      max: 2,
      img: "l121.webp",
      incomeType: "none",
      limit: 5,
      title: "Elite Hornets",
      description: ({ lvl }: LVL) =>
        `Hornet growth in your cities increases by 2. They gain ${Math.min(2, lvl)} Initiative.`,
    },
    l201: {
      id: "l201",
      cost: 3,
      max: 2,
      img: "l201.webp",
      incomeType: "none",
      limit: 15,
      title: "Elite Scorpions",
      description: ({ lvl }: LVL) =>
        `Hornet growth in your cities increases by 2. They gain ${lvl >= 2 ? 3 : 1} Initiative.`,
    },
    l211: {
      id: "l211",
      cost: 3,
      max: 2,
      img: "l211.webp",
      incomeType: "none",
      limit: 15,
      title: "Elite Reavers",
      description: ({ lvl }: LVL) =>
        `Reaver growth in your cities increases by 1. They gain ${lvl >= 2 ? 5 : 1} Morale and 1 Luck.`,
    },
    l221: {
      id: "l221",
      cost: 3,
      max: 2,
      img: "l221.webp",
      incomeType: "none",
      limit: 15,
      title: "Elite Waurmos",
      description: ({ lvl }: LVL) =>
        `Waurms growth in your cities increases by 1. They gain ${lvl >= 2 ? 5 : 1} Morale and 1 Luck.`,
    },
    l231: {
      id: "l231",
      cost: 4,
      max: 1,
      img: "l231.webp",
      incomeType: "none",
      limit: 15,
      title: "Hive Offsprings II",
      description: () => `Summoned Fire Larvae attack twice.`,
    },
    l301: {
      id: "l301",
      cost: 3,
      max: 2,
      img: "l301.webp",
      incomeType: "none",
      limit: 30,
      title: "Elite Hive Queens",
      description: ({ lvl }: LVL) =>
        `Hive Queen growth in your cities increases by 1. They deal +${Math.min(10, lvl * 5)} Damage and gain ${Math.min(50, lvl * 25)} HP.`,
    },
    l311: {
      id: "l311",
      cost: 2,
      max: 3,
      img: "l311.webp",
      incomeType: "none",
      limit: 30,
      title: "Elite Hive Queens",
      description: ({ lvl }: LVL) =>
        `When battling in the area you do not control, friendly creatures gain ${Math.min(6, lvl * 2)} Attack and Defense.`,
    },
    l401: {
      id: "l401",
      cost: 4,
      max: 2,
      img: "l401.webp",
      incomeType: "none",
      limit: 50,
      title: "Infernal Rage",
      description: ({ lvl }: LVL) =>
        `Friendly creatures deal +${Math.min(2, lvl)} Damage.`,
    },
    l411: {
      id: "l411",
      cost: 3,
      max: 3,
      img: "l411.webp",
      incomeType: "none",
      limit: 50,
      title: "No Compassion",
      description: ({ lvl }: LVL) =>
        `The chance of Morale or Luck triggering for friendly creatures increases by ${Math.min(3, lvl)}% for each point of their Morale or Luck, respectively.`,
    },
    l421: {
      id: "l421",
      cost: 5,
      max: 1,
      img: "l421.webp",
      incomeType: "none",
      limit: 50,
      title: "Hive Offsprings III",
      description: () =>
        `Summoned Fire Larvae provoke adjacent enemies to attack them over other units.`,
    },
  },
  schism: {
    l000: {
      id: "l000",
      cost: 1,
      max: 1,
      img: "l000.webp",
      incomeType: "once",
      income: {
        gold: 2500,
        wood: 5,
        ore: 5,
      },
      limit: 0,
      title: "Resource Riches I",
      description: () =>
        "Provides a one-time allotment of 2500 Gold, 5 Wood, and 5 Ore when enacted.",
    },
    l010: {
      id: "l010",
      cost: 2,
      max: 3,
      img: "l010.webp",
      incomeType: "once",
      limit: 0,
      title: "Inevitable Destruction",
      description: ({ lvl }: LVL) =>
        `When destroying artifacts, you gain +${Math.min(30, lvl * 10)}% Alchemical Dust.`,
    },
    l020: {
      id: "l020",
      cost: 1,
      max: 2,
      img: "l020.webp",
      incomeType: "once",
      limit: 0,
      title: "Depths of Mind",
      description: ({ lvl }: LVL) =>
        `Your Schism heroes restore +${Math.min(20, lvl * 10)}% mana each morning.`,
    },
    l001: {
      id: "l001",
      cost: 3,
      max: 2,
      img: "l001.webp",
      incomeType: "once",
      limit: 0,
      title: "Elite Ra'Shoth",
      description: ({ lvl }: LVL) =>
        `Ra’Shoth growth in your cities increases by ${Math.min(8, lvl * 4)}. They gain 1 Initiative.`,
    },
    l011: {
      id: "l011",
      img: "l011.webp",
      cost: 2,
      max: 2,
      incomeType: "once",
      limit: 0,
      title: "Unfrozen Strength I",
      description: ({ lvl }: LVL) =>
        `Tier-1 friendly creatures gain ${Math.min(20, lvl * 10)}% of their hero’s Attack and Spell Power as Attack, ${Math.min(20, lvl * 10)}% of their Defense and Knowledge as Defense.`,
    },
    l021: {
      id: "l021",
      img: "l021.webp",
      cost: 3,
      max: 3,
      incomeType: "once",
      limit: 0,
      title: "Frozen Homeland",
      description: ({ lvl }: LVL) =>
        `Friendly creatures gain ${Math.min(3, lvl)} Attack and Defense when they battle on their Native Terrain.`,
    },
    l100: {
      id: "l100",
      img: "l100.webp",
      cost: 2,
      max: 2,
      incomeType: "daily",
      income: {
        gold: 250,
      },
      limit: 5,
      title: "Tax Collectors",
      description: ({ lvl }: LVL) =>
        `Produces ${Math.min(750, lvl * 250)} Gold daily.`,
    },
    l110: {
      id: "l110",
      cost: 2,
      max: 2,
      img: "l110.webp",
      incomeType: "daily",
      income: {
        mercury: 1,
      },
      limit: 5,
      title: "Mining: Mercury",
      description: ({ lvl }: LVL) =>
        `Produces ${Math.min(2, lvl)} Mercury daily.`,
    },
    l120: {
      id: "l120",
      cost: 4,
      max: 2,
      img: "l120.webp",
      incomeType: "none",
      limit: 5,
      title: "Generational Wisdom",
      description: ({ lvl }: LVL) =>
        `Your heroes gain +${Math.min(20, lvl * 10)}% XP.`,
    },
    l130: {
      id: "l130",
      cost: 2,
      max: 3,
      img: "l130.webp",
      incomeType: "none",
      limit: 5,
      title: "Ice Power",
      description: ({ lvl }: LVL) =>
        `Your heroes gain +${Math.min(3, lvl)} Spell Power.`,
    },
    l101: {
      id: "l101",
      img: "l101.webp",
      cost: 3,
      max: 1,
      incomeType: "none",
      limit: 5,
      title: "Elite Cultists",
      description: () =>
        `Cultist growth in your cities increases by 4. They deal +1 Damage.`,
    },
    l111: {
      id: "l111",
      img: "l111.webp",
      cost: 3,
      max: 1,
      incomeType: "none",
      limit: 5,
      title: "Elite Aga'Shoth Riders",
      description: () =>
        `Aga’Shoth Rider growth in your cities increases by 2. They gain 5 HP.`,
    },
    l121: {
      id: "l121",
      img: "l121.webp",
      cost: 2,
      max: 2,
      incomeType: "none",
      limit: 5,
      title: "Unfrozen Strength II",
      description: ({ lvl }: LVL) =>
        `Tier-2 friendly creatures gain ${Math.min(20, lvl * 10)}% of their hero’s Attack and Spell Power as Attack, ${Math.min(20, lvl * 10)}% of their Defense and Knowledge as Defense.`,
    },
    l131: {
      id: "l131",
      img: "l131.webp",
      cost: 2,
      max: 2,
      incomeType: "none",
      limit: 5,
      title: "Unfrozen Strength III",
      description: ({ lvl }: LVL) =>
        `Tier-3 friendly creatures gain ${Math.min(20, lvl * 10)}% of their hero’s Attack and Spell Power as Attack, ${Math.min(20, lvl * 10)}% of their Defense and Knowledge as Defense.`,
    },
    l200: {
      id: "l200",
      img: "l200.webp",
      cost: 2,
      max: 1,
      incomeType: "once",
      income: {
        gold: 5000,
        wood: 10,
        ore: 10,
      },
      limit: 15,
      title: "Resource Riches II",
      description: () =>
        `Provides a one-time allotment of 5000 Gold, 10 Wood, and 10 Ore when enacted.`,
    },
    l210: {
      id: "l210",
      img: "l210.webp",
      cost: 3,
      max: 1,
      incomeType: "none",
      limit: 15,
      title: "Otherworldly Magic",
      description: () => `Arcane spells of your heroes gain 1 level.`,
    },
    l220: {
      id: "l220",
      img: "l220.webp",
      cost: 2,
      max: 2,
      incomeType: "none",
      limit: 15,
      title: "Call of the Deep",
      description: ({ lvl }: LVL) =>
        `Your Schism heroes’ spells and friendly creatures’ abilities summon +${Math.min(20, lvl * 10)}% units.`,
    },
    l201: {
      id: "l201",
      img: "l201.webp",
      cost: 3,
      max: 2,
      incomeType: "none",
      limit: 15,
      title: "Elite Grand Shoth",
      description: ({ lvl }: LVL) =>
        `Grand Shoth growth in your cities increases by ${Math.min(4, lvl * 2)}. They gain 1 Speed.`,
    },
    l211: {
      id: "l211",
      img: "l211.webp",
      cost: 2,
      max: 2,
      incomeType: "none",
      limit: 15,
      title: "Unfrozen Strength IV",
      description: ({ lvl }: LVL) =>
        `Tier-4 friendly creatures gain ${Math.min(20, lvl * 10)}% of their hero’s Attack and Spell Power as Attack, ${Math.min(20, lvl * 10)}% of their Defense and Knowledge as Defense.`,
    },
    l221: {
      id: "l221",
      img: "l221.webp",
      cost: 3,
      max: 2,
      incomeType: "none",
      limit: 15,
      title: "Cold Touch",
      description: ({ lvl }: LVL) =>
        `All effects applied by your heroes and friendly creatures last ${Math.min(2, lvl)} additional round(s).`,
    },
    l300: {
      id: "l300",
      img: "l300.webp",
      cost: 3,
      max: 2,
      incomeType: "daily",
      income: {
        wood: 1,
        ore: 2,
      },
      limit: 30,
      title: "Survival Conditions",
      description: ({ lvl }: LVL) =>
        `Your cities produce +${Math.min(2, lvl)} Wood and Ore.`,
    },
    l310: {
      id: "l310",
      img: "l310.webp",
      cost: 2,
      max: 3,
      incomeType: "none",
      limit: 30,
      title: "Planar Explorers",
      description: ({ lvl }: LVL) =>
        `Produces ${Math.min(750, lvl * 250)} Astrology points daily.`,
    },
    l320: {
      id: "l320",
      img: "l320.webp",
      cost: 3,
      max: 1,
      incomeType: "none",
      limit: 30,
      title: "Absolute Zero",
      description: () =>
        `The cooldowns of all the battle spells of enemy heroes are increased by 1 round(s).`,
    },
    l330: {
      id: "l330",
      img: "l330.webp",
      cost: 6,
      max: 1,
      incomeType: "none",
      limit: 30,
      title: "Cold Shoulder",
      description: () =>
        `You can use Involuntary Summons in your Schism cities twice per week.`,
    },
    l301: {
      id: "l301",
      img: "l301.webp",
      cost: 3,
      max: 1,
      incomeType: "none",
      limit: 30,
      title: "Elite Concubi",
      description: () =>
        `Concubus growth in your cities increases by 1. They gain 4 Attack and Defense.`,
    },
    l311: {
      id: "l311",
      img: "l311.webp",
      cost: 3,
      max: 1,
      incomeType: "none",
      limit: 30,
      title: "Elite Arbitrators",
      description: () =>
        `Arbitrator growth in your cities increases by 1. They deal +4 Damage.`,
    },
    l321: {
      id: "l321",
      img: "l321.webp",
      cost: 2,
      max: 2,
      incomeType: "none",
      limit: 30,
      title: "Unfrozen Strength V",
      description: ({ lvl }: LVL) =>
        `Tier-5 friendly creatures gain ${Math.min(20, lvl * 10)}% of their hero’s Attack and Spell Power as Attack, ${Math.min(20, lvl * 10)}% of their Defense and Knowledge as Defense.`,
    },
    l331: {
      id: "l331",
      img: "l331.webp",
      cost: 2,
      max: 2,
      incomeType: "none",
      limit: 30,
      title: "Unfrozen Strength VI",
      description: ({ lvl }: LVL) =>
        `Tier-6 friendly creatures gain ${Math.min(20, lvl * 10)}% of their hero’s Attack and Spell Power as Attack, ${Math.min(20, lvl * 10)}% of their Defense and Knowledge as Defense.`,
    },
    l400: {
      id: "l400",
      img: "l400.webp",
      cost: 3,
      max: 1,
      incomeType: "once",
      income: {
        gold: 7500,
        wood: 15,
        ore: 15,
      },
      limit: 50,
      title: "Resource Riches III",
      description: () =>
        `Provides a one-time allotment of 7500 Gold, 15 Wood, and 15 Ore when enacted.`,
    },
    l410: {
      id: "l410",
      img: "l410.webp",
      cost: 4,
      max: 1,
      incomeType: "none",
      limit: 50,
      title: "Mind Freeze",
      description: () =>
        `Each round of battle, the enemy loses 1 Focus Charge(s).`,
    },
    l420: {
      id: "l420",
      img: "l420.webp",
      cost: 5,
      max: 1,
      incomeType: "none",
      limit: 50,
      title: "The Abyss Stares Back",
      description: () =>
        `Your Schism heroes start each day with maximum Communion level.`,
    },
    l430: {
      id: "l430",
      img: "l430.webp",
      cost: 3,
      max: 1,
      incomeType: "none",
      limit: 50,
      title: "The World is Ours",
      description: () => `Friendly creatures treat all Terrains as Native.`,
    },
    l401: {
      id: "l401",
      img: "l401.webp",
      cost: 3,
      max: 2,
      incomeType: "none",
      limit: 50,
      title: "Elite Abyssal Envoys",
      description: ({ lvl }: LVL) =>
        `Abyssal Envoy growth in your cities increases by ${Math.min(2, lvl)}. They gain 3 Speed and Initiative.`,
    },
    l411: {
      id: "l411",
      img: "l411.webp",
      cost: 2,
      max: 2,
      incomeType: "none",
      limit: 50,
      title: "Unfrozen strength VII",
      description: ({ lvl }: LVL) =>
        `Tier-7 friendly creatures gain ${Math.min(20, lvl * 10)}% of their hero’s Attack and Spell Power as Attack, ${Math.min(20, lvl * 10)}% of their Defense and Knowledge as Defense.`,
    },
    l421: {
      id: "l421",
      img: "l421.webp",
      cost: 4,
      max: 1,
      incomeType: "none",
      limit: 50,
      title: "Ice Storms",
      description: () => `All enemy creatures lose 1 Speed and Initiative.`,
    },
  },
} as const;
// { lvl }: LVL
// ${Math.min(20, lvl * 10)}
// On-screen layout for each faction's law board: each inner array is a group
// (column) of law ids, mirroring the original nested-array positions.
export const LAW_LAYOUT: {
  // Each faction's layout references only that faction's own law ids.
  [F in FactionID]: {
    left: (keyof (typeof LAWS)[F])[][];
    right: (keyof (typeof LAWS)[F])[][];
  };
} = {
  hive: {
    left: [
      ["l000", "l010", "l020", "l030"],
      ["l100", "l110", "l120"],
      ["l200", "l210", "l220"],
      ["l300", "l310"],
      ["l400", "l410", "l420"],
    ],
    right: [
      ["l001", "l011", "l021"],
      ["l101", "l111", "l121"],
      ["l201", "l211", "l221", "l231"],
      ["l301", "l311"],
      ["l401", "l411", "l421"],
    ],
  },
  schism: {
    left: [
      ["l000", "l010", "l020"],
      ["l100", "l110", "l120", "l130"],
      ["l200", "l210", "l220"],
      ["l300", "l310", "l320", "l330"],
      ["l400", "l410", "l420", "l430"],
    ],
    right: [
      ["l001", "l011", "l021"],
      ["l101", "l111", "l121", "l131"],
      ["l201", "l211", "l221"],
      ["l301", "l311", "l321", "l331"],
      ["l401", "l411", "l421"],
    ],
  },
};

type LVL = { lvl: number };
type Sight = { sight: number };

export type FactionID = keyof typeof LAWS;

// One faction's full law map.
export type FactionLaws = (typeof LAWS)[FactionID];

// Every law id across all factions. `keyof FactionLaws` can't be used here:
// `keyof` over a union yields only the keys shared by every member (the
// intersection), which drops faction-unique ids — so build the union explicitly.
export type LawID = { [F in FactionID]: keyof (typeof LAWS)[F] }[FactionID];

// Every law's config across all factions.
export type LawType = {
  [F in FactionID]: (typeof LAWS)[F][keyof (typeof LAWS)[F]];
}[FactionID];
