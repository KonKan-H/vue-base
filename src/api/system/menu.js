import request from '@/utils/request'

export function getMenuList(data) {
    return request({
        url: 'menu/treeList',
        method: 'post',
        data
    })
}

export function addMenu(data) {
    return request({
        url: '/menu/add',
        method: 'post',
        data
    })
}

export function updateMenu(data) {
    return request({
        url: '/menu/update',
        method: 'post',
        data
    })
}

export function deleteMenu(data) {
    return request({
        url: '/menu/delete',
        method: 'post',
        data
    })
}