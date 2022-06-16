import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import Nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import { MessagePlugin } from 'tdesign-vue-next';

import { appTitle } from '@/utils/constant';
import homeRoutes from './modules/home';
import LayOut from '@/layout/index.vue';
import { getUserStore } from '@/stores';

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
    redirect: '/home',
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
    path: '/:pathMatch(.*)*',
    name: 'error',
    component: LayOut,
    children: [
      {
        path: '/:pathMatch(.*)*',
        name: '404Page',
        component: () => import('@/pages/error/404Page.vue'),
        meta: {
          title: '404',
          needAuth: true,
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

router.beforeEach((to, from, next) => {
  Nprogress.start();
  const userStore = getUserStore();
  const token = userStore.token;
  if (to.name === 'login') {
    if (token) {
      next('/home');
      return;
    }
    userStore.$reset();
    next();
    return;
  }
  if (!token) {
    if (to.meta.needAuth) {
      next({ path: `/login?redirect=${from.path}`, replace: true });
      MessagePlugin.error('请登录后访问！');
      return;
    }
    next();
    return;
  }
  next();
});

router.afterEach((to) => {
  Nprogress.done();
  document.title = appTitle + ' - ' + to.meta.title;
});

export default router;
