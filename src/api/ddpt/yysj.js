import request from '@/utils/request'

export function getDetails() {
    return request({
        url: '/oauthClient/getAllOauthClientDetails',
        method: 'get'
    })
}

export function addDetails(data) {
    return request({
        url: '/oauthClient/insertOauthClientDetail',
        method: 'post',
        data
    })
}

export function deleteDetails(data) {
    return request({
        url: '/oauthClient/deleteOauthClientDetail',
        method: 'post',
        data
    })
}