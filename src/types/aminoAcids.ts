export const AMINO_ACIDS = [
  'A',
  'R',
  'N',
  'D',
  'C',
  'E',
  'Q',
  'G',
  'H',
  'I',
  'L',
  'K',
  'M',
  'F',
  'P',
  'S',
  'T',
  'W',
  'Y',
  'V',
  '-',
] as const;

export type AminoAcid = (typeof AMINO_ACIDS)[number];

export type TypeColors =
  | 'hydrophobic'
  | 'negativelyCharged'
  | 'positivelyCharged'
  | 'polarUncharged'
  | 'cysteine'
  | 'gap'
  | 'glycine';

const COLOR_SCHEME: Record<TypeColors, string> = {
  hydrophobic: '#67E4A6',
  negativelyCharged: '#FC9CAC',
  positivelyCharged: '#BB99FF',
  polarUncharged: '#80BFFF',
  cysteine: '#FFEA00',
  gap: '#FFFFFF',
  glycine: '#C4C4C4',
};

const AMINO_ACID_GROUPS: Record<AminoAcid, TypeColors> = {
  A: 'hydrophobic', // Гидрофобные
  R: 'positivelyCharged', // Положительно заряженные
  N: 'polarUncharged', // Полярные незаряженные
  D: 'negativelyCharged', // Отрицательно заряженные
  C: 'cysteine', // Цистеин
  E: 'negativelyCharged', // Отрицательно заряженные
  Q: 'polarUncharged', // Полярные незаряженные
  G: 'glycine', // Глицин
  H: 'polarUncharged', // Полярные незаряженные
  I: 'hydrophobic', // Гидрофобные
  L: 'hydrophobic', // Гидрофобные
  K: 'positivelyCharged', // Положительно заряженные
  M: 'hydrophobic', // Гидрофобные
  F: 'hydrophobic', // Гидрофобные
  P: 'hydrophobic', // Гидрофобные
  S: 'polarUncharged', // Полярные незаряженные
  T: 'polarUncharged', // Полярные незаряженные
  W: 'hydrophobic', // Гидрофобные
  Y: 'hydrophobic', // Гидрофобные
  V: 'hydrophobic', // Гидрофобные
  '-': 'gap', // Дефис (пропуск)
};

export const AMINO_ACID_COLORS: Record<AminoAcid, string> = Object.fromEntries(
  AMINO_ACIDS.map((aminoAcid) => [aminoAcid, COLOR_SCHEME[AMINO_ACID_GROUPS[aminoAcid]]]),
) as Record<AminoAcid, string>;

export const isValidAminoAcid = (char: string): char is AminoAcid => {
  return AMINO_ACIDS.includes(char as AminoAcid);
};
