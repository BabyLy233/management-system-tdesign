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
        },
      },
    ],
  },
];

export default homeRoutes;
