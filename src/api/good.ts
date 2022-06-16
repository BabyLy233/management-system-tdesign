import axios from '@/utils/request';
import type { getGoodsByPageParam, editGoodParam, addGoodParam } from '@/interfaces';

enum API {
  getGoodsByPage = '/admin/good/record',
  editGood = '/admin/good/record',
  addGood = '/admin/good/record/add',
  delGood = '/admin/good/record',
}

export function getGoodsByPage(param: getGoodsByPageParam) {
  return axios.get(
    API.getGoodsByPage +
      `/${param.numEachPage}/${param.currentPage}?goodName=${
        param.goodName === undefined ? '' : param.goodName
      }&status=${param.status === undefined ? '' : param.status}`,
  );
}

export function editGood(param: editGoodParam) {
  return axios.put(API.editGood, param);
}

export function addGood(param: addGoodParam) {
  return axios.post(API.addGood, param);
}

export function delGood(param: number) {
  return axios.delete(API.delGood + `/${param}`);
}
