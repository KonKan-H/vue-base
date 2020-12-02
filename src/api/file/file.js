import request from '@/utils/request'

export function setSerImgId(data) {
    return request({
        url: '/file/updateAttachmentTypeAndItemidByguid',
        method: 'post',
        data
    })
}

export function updateImage(data) {
    return request({
        url: '/file/updateIamge',
        method: 'post',
        data
    })
}