import { CharacterClass } from '../services';

export const charaterClassMap = {
  attack: 0,
  defend: 2,
  heal: 1,
} satisfies Record<string, CharacterClass>;

export const charaterClassNameMap = {
  0: '输出',
  2: '防御',
  1: '治疗',
} satisfies Record<CharacterClass, string>;