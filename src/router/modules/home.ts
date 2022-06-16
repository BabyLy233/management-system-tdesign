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
      {
        path: 'category',
        name: 'category',
        component: () => import('@/pages/category/index.vue'),
        meta: {
          title: '分类管理',
          icon: 'layers',
        },
      },
      {
        path: 'good-list',
        name: 'good-list',
        component: () => import('@/pages/good-list/index.vue'),
        meta: {
          title: '商品管理',
          icon: 'control-platform',
        },
      },
      {
        path: 'orders',
        name: 'orders',
        component: () => import('@/pages/order/index.vue'),
        meta: {
          title: '订单查询',
          icon: 'root-list',
        },
      },
      {
        path: 'employee',
        name: 'employee',
        component: () => import('@/pages/employee/index.vue'),
        meta: {
          title: '员工信息',
          icon: 'user-avatar',
        },
      },
      {
        path: 'member',
        name: 'member',
        component: () => import('@/pages/member/index.vue'),
        meta: {
          title: '会员信息',
          icon: 'usergroup',
        },
      },
    ],
  },
];

export default homeRoutes;
