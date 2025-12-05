// Central UI color constants for Polestar app
import { PolestarColors } from './colors';

export const UIColors = {
  ACTIVE: PolestarColors.safetyOrange, // active / primary action
  ACTIVE_ACCESSIBLE: PolestarColors.accessibleSafetyOrange,
  ELEMENTAL_RED: PolestarColors.elementalRed, // Elemental Red (Polestar alert)
  ALERT: PolestarColors.elementalRed, // Alias for Elemental Red for semantic clarity
  SUCCESS: PolestarColors.success,
  DISABLED: PolestarColors.greyChateau,
  SECONDARY: PolestarColors.ironGrey,
} as const;

export type UIColorKey = keyof typeof UIColors;
export default UIColors;
