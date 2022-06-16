import { MessagePlugin } from 'tdesign-vue-next';
import { defineStore } from 'pinia';
import type { tokenInfoType, userInfoType } from '@/interfaces';

export const useUserStore = defineStore('userStore', {
  state: () => ({
    userInfo: JSON.parse(sessionStorage.getItem('userInfo') as string) as userInfoType,
    tokenInfo: JSON.parse(sessionStorage.getItem('tokenInfo') as string) as tokenInfoType,
  }),
  getters: {
    token: (state): string => state.tokenInfo?.tokenValue as string,
  },
  actions: {
    afterLogin(res: any) {
      this.userInfo = res.userInfo;
      this.tokenInfo = res.tokenInfo;
      sessionStorage.setItem('userInfo', JSON.stringify(this.userInfo));
      sessionStorage.setItem('tokenInfo', JSON.stringify(this.tokenInfo));
    },
    logout() {
      sessionStorage.clear();
      MessagePlugin.success('当前帐号已退出登录！');
    },
  },
});

export const getUserStore = () => {
  return useUserStore();
};
