import request from '../utils/request'

export function upload (data) {
  return request({
    url: '/blog/upload',
    method: 'POST',
    data,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}
export function saveData(data) {
  return request({
    url: '/blog/saveData',
    method: 'POST',
    data
  })
}
export function getList(query) {
  return request({
    url: '/blog/getList',
    method: 'GET',
    params:query
  })
}
export function deleteBlog(id) {
  return request({
    url: '/blog/deleteBlog',
    method: 'GET',
    params: {id}
  })
}
export function getDetail(id,ip,edit) {
  return request({
    url: '/blog/getDetail',
    method: 'GET',
    params: {id,ip,edit}
  })
}
export function getCategory(){
  return request({
    url: '/blog/getCategory',
    method: 'GET'
  })
}
export function getCategoryList(){
  return request({
    url: '/blog/getCategoryList',
    method: 'GET'
  })
}
export function getHotList() {
  return request({
    url: '/blog/getHotList',
    method:'GET'
  })
}
export function updateEavl(ip, id, type) {
 return request({
    url: '/blog/blogEval',
    method: 'GET',
    params: {ip,id,type}
  })
}
export function getBlogEvalInfo (id) {
 return request({
    url: '/blog/getBlogEvalInfo',
    method: 'GET',
    params: {id}
  })
}