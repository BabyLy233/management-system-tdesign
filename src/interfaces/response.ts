export interface responseData {
  code: number;
  message: string;
  data: any;
}

export interface categoryData {
  id?: number;
  categoryName?: string;
  categoryLevel?: number;
  parentId?: number;
  isHidden?: number;
  imgUrl?: string;
  createTime?: string;
  updateTime?: string;
  isDel?: number;
}

export interface goodData {
  id?: number;
  goodName?: string;
  imgUrl?: string;
  goodCategory?: number;
  goodStock?: number;
  isHidden?: number;
  createTime?: string;
  updateTime?: string;
  isDel?: number;
  oprice?: number;
  cprice?: number;
}
