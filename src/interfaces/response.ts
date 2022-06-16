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

export interface employeeData {
  id?: number;
  username?: string;
  passwordMd5?: string;
  email?: string;
  phone?: string;
  createTime?: string;
  updateTime?: string;
  isDel?: number;
}

export interface memberData {
  id?: string;
  openId?: string;
  nickname?: string;
  avatarUrl?: string;
  phone?: string;
  passwordMd5?: string;
  createTime?: string;
  updateTime?: string;
  isDel?: string;
}

export interface orderData {
  id?: number;
  orderId?: string;
  userId?: number;
  orderItem?: string;
  orderStatus?: number;
  oprice?: number;
  cprice?: number;
  createTime?: string;
  updateTime?: string;
  isDel?: string;
}
