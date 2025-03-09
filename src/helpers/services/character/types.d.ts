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
   * 职业类型 0-输出 1-治疗 2-承伤
   */
  characterRole: CharacterClass;

  /**
   * 性别(male/female)
   */
  characterGender: Genders;

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

export interface IFetchUpdateCharacterParams {
  /**
   * 角色ID
   */
  characterId: number;

  /**
   * 角色名称
   */
  name?: string;

  /**
   * 角色性别
   */
  gender?: Genders;
  /**
   * 职业类型 0-输出 1-治疗 2-承伤(可选)
   */
  role?: CharacterClass;
}

export interface IFetchCreateCharacterData {
  characterId: Number;

  /**
   * 角色名称
   */
  characterName: string;
  /**
   * 性别
   */
  characterGender: Genders;
  /**
   * 职业类型
   */
  characterRole: CharacterClass;

  createTime: string;
  updateTime: string;
}
