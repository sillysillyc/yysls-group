import type { Genders } from './../account/types';

/**
 * 0-输出
 *
 * 1-治疗
 *
 * 2-承伤(可选)
 */
export type CharacterClass = 0 | 1 | 2;

export interface IFetchQueryCharacterListParams extends IPaginationOptions {}

export interface ICharacterInfo {
  /**
   * 角色id
   */
  characterId: number;

  /**
   * 角色名称
   */
  characterName: string;

  /**
   * 职业类型
   *
   * 0-输出
   *
   * 1-治疗
   *
   * 2-承伤
   *
   * {@link CharacterClass}
   */
  characterRole: CharacterClass;

  /**
   * 性别(male/female)
   */
  characterGender: Genders;

  /**
   * 角色等级
   */
  characterLevel: number;

  /**
   * 角色造诣
   */
  characterAttainments: number;

  /**
   * 角色创建时间
   */
  createTime: string;

  /**
   * 角色更新时间
   */
  updateTime: string;
}

export interface IFetchQueryCharacterListData {
  characters: ICharacterInfo[];
}

export interface IFetchUpdateCharacterParams
  extends Partial<Omit<ICharacterInfo, 'characterId' | 'createTime' | 'updateTime'>> {
  /**
   * 角色ID
   */
  characterId: number;
}

export interface IFetchCreateCharacterParams
  extends Omit<IFetchUpdateCharacterParams, 'characterId' | 'characterName'> {
  characterName: string;
}

export interface IFetchCreateCharacterData extends ICharacterInfo {}
