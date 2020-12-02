import request from '@/utils/request'

export function getInfo() {
  return request({
    url: '/user/permission_list',
    // url: '/menus',
    method: 'post',
  })
}

export function login(data) {
  return request({
    url: '/public/login',
    method: 'post',
    data 
  })
}