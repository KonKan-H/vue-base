import request from '@/utils/request'

export function getDdptYyAll(id) {
    return request({
        url: '/ddptYy/getDdptYyAll',
        method: 'get',
        params: { id }
    })
}

export function deleteDdptYy(data) {
    return request({
        url: '/ddptYy/deleteDdptYy',
        method: 'post',
        data
    })
}

export function saveDdptYy(data) {
    return request({
        url: '/ddptYy/saveDdptYy',
        method: 'post',
        data
    })
}

export function updateDdptYy(data) {
    return request({
        url: '/ddptYy/updateDdptYy',
        method: 'post',
        data
    })
}