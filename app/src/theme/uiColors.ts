import { PolestarColors } from './colors';

export const UIColors = {
  ACTIVE: PolestarColors.safetyOrange,
  ACTIVE_ACCESSIBLE: PolestarColors.accessibleSafetyOrange,
  ELEMENTAL_RED: PolestarColors.elementalRed,
  ALERT: PolestarColors.elementalRed,
  SUCCESS: PolestarColors.success,
  DISABLED: PolestarColors.greyChateau,
  SECONDARY: PolestarColors.ironGrey,
} as const;

export type UIColorKey = keyof typeof UIColors;
export default UIColors;
