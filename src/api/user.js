import request from '../utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}
export function getInfo() {
  return request({
    url: '/user/getInfo',
    method: 'GET'
  })
}
export function getUserIp(){
  return request({
    url: '/apis/cityjson?ie=utf-8',
    method: 'post'
  })
}