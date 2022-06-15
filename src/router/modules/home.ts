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
        component: () => import('@/pages/cashier/index.vue'),
        meta: {
          title: '订单查询',
          icon: 'root-list',
        },
      },
      {
        path: 'shortage',
        name: 'shortage',
        component: () => import('@/pages/cashier/index.vue'),
        meta: {
          title: '缺货商品查看',
          icon: 'link-unlink',
        },
      },
      {
        path: 'provider',
        name: 'provider',
        component: () => import('@/pages/cashier/index.vue'),
        meta: {
          title: '供应商查询',
          icon: 'queue',
        },
      },
      {
        path: 'purchase',
        name: 'purchase',
        component: () => import('@/pages/cashier/index.vue'),
        meta: {
          title: '进货单查询',
          icon: 'scan',
        },
      },
      {
        path: 'employee',
        name: 'employee',
        component: () => import('@/pages/cashier/index.vue'),
        meta: {
          title: '员工信息',
          icon: 'user-avatar',
        },
      },
      {
        path: 'member',
        name: 'member',
        component: () => import('@/pages/cashier/index.vue'),
        meta: {
          title: '会员信息',
          icon: 'usergroup',
        },
      },
    ],
  },
];

export default homeRoutes;
