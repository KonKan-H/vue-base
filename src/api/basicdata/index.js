import request from '@/utils/request'

// export function getParentData() {
//     return request({
//         url: '/basicData/getParentData',
//         method: 'get'
//     })
// }

export function getBasicData(parentId) {
    return request({
        url: '/basicData/getBasicData',
        method: 'get',
        params:{ parentId }
    })
}

export function saveBasicData(data) {
    return request({
        url: '/basicData/saveBasicData',
        method: 'post',
        data
    })
}

export function deleteData(data) {
    return request({
        url: '/basicData/deleteBasic',
        method: 'post',
        data
    })
}