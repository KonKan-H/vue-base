import request from '@/utils/request'

export function getDdptYyzAll() {
    return request({
        url: '/ddptYyz/getDdptYyzAll',
        method: 'get'
    })
}

export function createDdptYyz(data) {
    return request({
        url: '/ddptYyz/saveDdptYyz',
        method: 'post',
        data
    })
}

export function updateDdptYyz(data) {
    return request({
        url: '/ddptYyz/updateDdptYyz',
        method: 'post',
        data
    })
}

export function deleteDdptYyz(data) {
    return request({
        url: '/ddptYyz/deleteDdptYyz',
        method: 'post',
        data
    })
}
