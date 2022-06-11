import type { RouteRecordRaw } from 'vue-router';
import LayOut from '@/layout/index.vue';

const homeRoutes: RouteRecordRaw[] = [
  {
    path: '/home',
    name: 'home',
    component: LayOut,
    redirect: '/home/dashboard',
    meta: {
      title: '管理中心',
      needAuth: true,
    },
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/pages/dashboard/index.vue'),
        meta: {
          title: '仪表盘',
          icon: 'dashboard',
        },
      },
      {
        path: 'cashier',
        name: 'cashier',
        component: () => import('@/pages/cashier/index.vue'),
        meta: {
          title: '收银台',
          icon: 'money-circle',
        },
      },
    ],
  },
];

export default homeRoutes;
