// Local, minimal stand-ins for the host app's domain types. In the host these
// derive from the full `castles` config and resource constants; the Law feature
// only needs the identifiers, so we narrow them to what this remote ships.

/** Factions whose law boards this remote serves. Only "hive" is bundled. */
export type CastleID = "hive";

/** Resource keys referenced by law income entries. */
export type ResourceKey =
  | "gold"
  | "wood"
  | "ore"
  | "gems"
  | "crystals"
  | "mercury"
  | "dust"
  | "law"
  | "astrology";
