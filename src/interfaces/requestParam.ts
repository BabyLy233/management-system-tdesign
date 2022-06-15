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

export interface addCategoryParam {
  categoryName?: string;
  imgUrl?: string;
  categoryLevel?: number;
  parentId?: number;
  isHidden?: number;
}

export interface getGoodsByPageParam {
  numEachPage: number;
  currentPage: number;
  goodName?: string;
  status?: number;
}

export interface editGoodParam {
  id?: number;
  goodName?: string;
  imgUrl?: string;
  goodCategory?: number;
  goodStock?: number;
  isHidden?: number;
  oprice?: number;
  cprice?: number;
}

export interface addGoodParam {
  goodName?: string;
  imgUrl?: string;
  goodCategory?: number;
  goodStock?: number;
  isHidden?: number;
  oprice?: number;
  cprice?: number;
}
