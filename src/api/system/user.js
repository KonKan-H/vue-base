import request from '@/utils/request'

export function fetchList(data) {
    return request({
        url: '/user/list',
        method: 'post',
        data
    })
}


export function getDeptTree(data) {
    return request({
        url: 'enterprise/treeList',
        method: 'post',
        data
    })
}

export function createUser(data) {
    return request({
        url: '/user/save',
        method: 'post',
        data
    })
}

export function updateUser(data) {
    return request({
        url: '/user/update',
        method: 'post',
        data
    })
}

export function deleteUser(data) {
    return request({
        url: '/user/deleteBatch',
        method: 'post',
        data
    })
}

export function disabled(data) {
    return request({
        url: '/user/disabled',
        method: 'post',
        data
    })
}

export function enable(data) {
    return request({
        url: '/user/enable',
        method: 'post',
        data
    })
}

export function role(data) {
    return request({
        url: '/role/list',
        method: 'post',
        data
    })
}