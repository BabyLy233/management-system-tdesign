import axios from '@/utils/request';
import type { getMemberByPage } from '@/interfaces';

enum API {
  getMemberByPage = 'https://backend.withzhou.xyz/api/wx/record',
}

export function getMemberByPage(param: getMemberByPage) {
  return axios.get(API.getMemberByPage + `/${param.numEachPage}/${param.currentPage}`);
}
