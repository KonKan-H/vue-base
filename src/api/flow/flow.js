import request from '@/utils/request'
import { remove } from 'js-cookie'

export function findWfProcessInfoS() {
    return request({
        url: '/WfProcessInfo/findWfProcessInfoS',
        method: 'post'
    })
}

export function getProcessById(data) {
    return request({
        url: 'WfProcessInfo/getProcess',
        method: 'post',
        data
    })
}

export function saveNode(data) {
    return request({
        url: '/WfProcessNodes/saveNode',
        method: 'post',
        data
    })
}

export function saveLine(data) {
    return request({
        url: '/WfProcessLine/updateLine',
        method: 'post',
        data
    })
}

export function deleteNode(data) {
    return request({
        url: '/WfProcessNodes/deleteProcessNodes',
        method: 'post',
        data
    })
}

export function deleteLine(data) {
    return request({
        url: '/WfProcessLine/deleteEnLine',
        method: 'post',
        data
    })
}

//取得 节点序列id
export function getNodeId() {
    return request({
        url: '/WfProcessNodes/getWfProcessNodesId',
        method: 'get'
    })
}

export function saveProcessInfo(data) {
    return request({
        url: '/WfProcessInfo/saveWfProcessInfo',
        method: 'post',
        data
    })
} 