import axios from '@/utils/request';
import type { getEmployeeByPageParam } from '@/interfaces';

enum API {
  getEmployeeByPage = '/admin/user/record',
}

export function getEmployeeByPage(param: getEmployeeByPageParam) {
  return axios.get(
    API.getEmployeeByPage +
      `/${param.numEachPage}/${param.currentPage}?username=${param.username === undefined ? '' : param.username}`,
  );
}
