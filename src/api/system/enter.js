import request from '@/utils/request'

export function addEnter(data) {
    return request({
        url: '/enterprise/add',
        method: 'post',
        data
    })
}

export function updateEnter(data) {
    return request({
        url: '/enterprise/update',
        method: 'post',
        data
    })
}

export function deleteEnter(data) {
    return request({
        url: '/enterprise/delete',
        method: 'post',
        data
    })
}

export function disabledEnter(data) {
    return request({
        url: '/enterprise/disable',
        method: 'post',
        data
    })
}

export function enableEnter(data) {
    return request({
        url: '/enterprise/enable',
        method: 'post',
        data
    })
}