import { CharacterClass } from '../services';

export const charaterClassMap = {
  attack: 0,
  defend: 2,
  heal: 1,
} satisfies Record<string, CharacterClass>;

export const charaterClassNameMap = {
  0: 'C',
  2: 'T',
  1: '奶',
} satisfies Record<CharacterClass, string>;