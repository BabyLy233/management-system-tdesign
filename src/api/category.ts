import axios from '@/utils/request';
import type { getCategoryByPageParam, editCategoryParam, addCategoryParam } from '@/interfaces';

enum API {
  getCategoryByPage = '/admin/category/record',
  editCategory = '/admin/category/record',
  addCategory = '/admin/category/record/add',
  delCategory = '/admin/category/record',
}

export function getCategoryByPage(param: getCategoryByPageParam) {
  return axios.get(API.getCategoryByPage + `/${param.numEachPage}/${param.currentPage}`);
}

export function editCategory(param: editCategoryParam) {
  return axios.put(API.editCategory, param);
}

export function addCategory(param: addCategoryParam) {
  return axios.post(API.addCategory, param);
}

export function delCategory(param: number) {
  return axios.delete(API.delCategory + `/${param}`);
}
