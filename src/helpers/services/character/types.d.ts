export interface IFetchQueryCharacterListParams {
  page?: number;
  pageSize?: number;
}

export interface IFetchQueryCharacterListData {
  /**
   * 角色id
   */
  characterId: Number;

  /**
   * 角色名称
   */
  characterName: string;

  /**
   * 职业类型 0-输出 1-治疗 2-承伤
   */
  characterRole: number;

  /**
   * 性别(male/female)
   */
  characterGender: string;

  /**
   * 角色创建时间
   */
  createTime: string;

  /**
   * 角色更新时间
   */
  updateTime: string;
}
