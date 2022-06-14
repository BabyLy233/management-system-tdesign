import axios from '@/utils/request';
import type { getCategoryByPageParam, editCategoryParam } from '@/interfaces';

enum API {
  getCategoryByPage = '/admin/category/record',
  editCategory = '/admin/category/record',
}

export function getCategoryByPage(param: getCategoryByPageParam) {
  return axios.get(API.getCategoryByPage + `/${param.numEachPage}/${param.currentPage}`);
}

export function editCategory(param: editCategoryParam) {
  return axios.put(API.editCategory, param);
}
