export interface loginParam {
  username: string;
  password: string;
}

export interface registerParam {
  username: string;
  password: string;
  email: string;
  phone: string;
}

export interface getCategoryByPageParam {
  numEachPage: number;
  currentPage: number;
}

export interface editCategoryParam {
  id?: number;
  categoryName?: string;
  imgUrl?: string;
  categoryLevel?: number;
  parentId?: number;
  isHidden?: number;
}
