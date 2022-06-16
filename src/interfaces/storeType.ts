export interface userInfoType {
  email?: string;
  phone?: string;
  username?: string;
}

export interface tokenInfoType {
  isLogin?: boolean;
  loginDevice?: string;
  loginId?: string;
  loginType?: string;
  sessionTimeout?: number;
  tokenActivityTimeout?: number;
  tokenName?: string;
  tokenSessionTimeout?: number;
  tokenTimeout?: number;
  tokenValue?: string;
}
