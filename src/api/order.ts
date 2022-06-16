import axios from '@/utils/request';
import type { getOrderByPage } from '@/interfaces';

enum API {
  getOrderByPage = '/admin/order/record',
}

export function getOrderByPage(param: getOrderByPage) {
  return axios.get(
    API.getOrderByPage +
      `/${param.numEachPage}/${param.currentPage}?orderId=${
        param.orderId === undefined ? '' : param.orderId
      }&orderStatus=${param.orderStatus === 6 || undefined ? '' : param.orderStatus}`,
  );
}
