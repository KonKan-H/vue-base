import request from '@/utils/request'

export function addRole(data) {
    return request({
        url: '/role/save',
        method: 'post',
        data
    })
}
export function updateRole(data) {
    return request({
        url: '/role/update',
        method: 'post',
        data
    })
}

export function deleteRole(data) {
    return request({
        url: '/role/delete',
        method: 'post',
        data
    })
}

export function disabledRole(data) {
    return request({
        url: '/role/disable',
        method: 'post',
        data
    })
}

export function enableRole(data) {
    return request({
        url: '/role/enable',
        method: 'post',
        data
    })
}

export function setMenuList(data) {
    return request({
        url: '/role/bind',
        method: 'post',
        data
    })
}