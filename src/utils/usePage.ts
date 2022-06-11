import type { Router, RouteRecordRaw } from 'vue-router';

import homeRoutes from '@/router/modules/home';

export function goHome(router: Router): void {
  router.push('/home');
}

export function getMenuItem(): RouteRecordRaw[] | undefined {
  return homeRoutes[0].children;
}
