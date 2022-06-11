import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

import { appTitle } from '@/utils/constant';
import homeRoutes from './modules/home';

declare module 'vue-router' {
  interface RouteMeta {
    title: string;
    needAuth?: boolean;
  }
}

export const dynamicRouteList: RouteRecordRaw[] = [...homeRoutes];

export const defaultRouteList: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'base',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login/index.vue'),
    meta: {
      title: '登录页',
    },
  },
];

export const allRouteList: RouteRecordRaw[] = [...defaultRouteList, ...dynamicRouteList];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: allRouteList,
  scrollBehavior() {
    return {
      el: '#app',
      top: 0,
      behavior: 'smooth',
    };
  },
});

router.beforeEach((to, _from, next) => {
  document.title = appTitle + ' - ' + to.meta.title;
  next();
});

export default router;