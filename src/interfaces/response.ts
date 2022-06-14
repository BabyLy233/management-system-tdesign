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
