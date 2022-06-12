import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

import { appTitle } from '@/utils/constant';
import homeRoutes from './modules/home';
import LayOut from '@/layout/index.vue';

declare module 'vue-router' {
  interface RouteMeta {
    title: string;
    needAuth?: boolean;
    icon?: string;
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
  {
    path: '/:e+',
    name: 'error',
    component: LayOut,
    children: [
      {
        path: '/:w+',
        name: '404Page',
        component: () => import('@/pages/error/404Page.vue'),
        meta: {
          title: '404',
        },
      },
    ],
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
