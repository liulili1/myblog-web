import request from '../utils/request'

export function pushComment(data) {
  return request({
    url: '/comment/pushComment',
    method: 'post',
    data
  })
}
export function getCommentByBlog(id,type) {
  return request({
    url: '/comment/getCommentByBlog',
    method: 'get',
    params: {id, type}
  })
}