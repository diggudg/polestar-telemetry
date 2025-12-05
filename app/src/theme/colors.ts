/**
 * Polestar Design System Color Constants
 * Based on official Polestar brand guidelines
 *
 * Use these throughout the application for consistent theming
 */

export const PolestarColors = {
  black: '#000000',
  white: '#FFFFFF',
  transparent: 'rgba(0, 0, 0, 0)',

  safetyOrange: '#FF7500',
  accessibleSafetyOrange: '#F06E00',

  parisDaisy: '#F7EA48',
  aquamarine: '#59F3FD',
  elementalBlue: '#4C94FE',
  elementalRed: '#D80F21',

  darkGold: '#866D4B',
  lightGold: '#D3BC8D',

  error: '#DE2D21',
  info: '#1EBBE5',
  success: '#00E676',

  ironGrey: '#53565A',
  stormGrey: '#75787B',
  greyChateau: '#97999B',
  agatheGrey: '#B1B3B3',
  greyNurse: '#C8C9C7',
  greyWhite: '#D9D9D6',
  signalWhite: '#ECECE7',
  lightGrey: '#F0F0F0',
} as const;

export const SemanticColors = {
  active: PolestarColors.safetyOrange,
  activeAccessible: PolestarColors.accessibleSafetyOrange,

  alert: PolestarColors.elementalRed,
  error: PolestarColors.error,
  warning: PolestarColors.parisDaisy,
  success: PolestarColors.success,
  info: PolestarColors.info,

  serviceUrgent: PolestarColors.elementalRed,
  serviceSoon: PolestarColors.safetyOrange,
  serviceOk: PolestarColors.success,

  batteryLow: PolestarColors.elementalRed,
  batteryMedium: PolestarColors.safetyOrange,
  batteryGood: PolestarColors.success,

  disabled: PolestarColors.greyChateau,
  inactive: PolestarColors.stormGrey,

  textPrimaryLight: PolestarColors.black,
  textSecondaryLight: PolestarColors.ironGrey,
  textDisabledLight: PolestarColors.greyChateau,

  textPrimaryDark: PolestarColors.white,
  textSecondaryDark: PolestarColors.greyNurse,
  textDisabledDark: PolestarColors.stormGrey,

  backgroundLight: PolestarColors.white,
  surfaceLight: PolestarColors.signalWhite,
  backgroundDark: PolestarColors.black,
  surfaceDark: PolestarColors.ironGrey,
} as const;

export const MantineColors = {
  polestarOrange: [
    '#FFF3E6',
    '#FFE0C2',
    '#FFCC99',
    '#FFB366',
    '#FF9933',
    '#FF7500',
    '#F06E00',
    '#CC5C00',
    '#994500',
    '#662E00',
  ],

  polestarRed: [
    '#FFE6E8',
    '#FFBFC4',
    '#FF9199',
    '#FF636F',
    '#FF3545',
    '#D80F21',
    '#DE2D21',
    '#B80D1B',
    '#8A0A14',
    '#5C070E',
  ],

  polestarGrey: [
    '#F0F0F0',
    '#ECECE7',
    '#D9D9D6',
    '#C8C9C7',
    '#B1B3B3',
    '#97999B',
    '#75787B',
    '#53565A',
    '#3A3C3F',
    '#1A1B1E',
  ],

  polestarGreen: [
    '#E6FFF0',
    '#B3FFD6',
    '#80FFBB',
    '#4DFFA1',
    '#1AFF86',
    '#00E676',
    '#00CC69',
    '#00B35C',
    '#00994F',
    '#008042',
  ],

  polestarCyan: [
    '#E6FEFF',
    '#B3FCFF',
    '#80FAFF',
    '#59F3FD',
    '#33F0FF',
    '#1EBBE5',
    '#17A2CC',
    '#1189B3',
    '#0B7099',
    '#055780',
  ],

  polestarYellow: [
    '#FFFDE6',
    '#FFFAB3',
    '#FFF780',
    '#FFF34D',
    '#FFEF1A',
    '#F7EA48',
    '#DED140',
    '#C5B838',
    '#AC9F30',
    '#938628',
  ],
} as const;

export type PolestarColorKey = keyof typeof PolestarColors;
export type SemanticColorKey = keyof typeof SemanticColors;
