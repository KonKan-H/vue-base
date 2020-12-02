import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/v1/getList',
    method: 'post',
     query
  })
}

export function fetchArticle(id) {
  return request({
    url: '',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '',
    method: 'post',
    data
  })
}
