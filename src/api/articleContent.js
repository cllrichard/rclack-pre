import request from '@/utils/request'

export function getInfoList(data) {
  return request({
    url: '/index/getInfoList',
    method: 'post',
    data
  })
}


export function saveInfoList(data) {
  return request({
    url: '/articleContent/saveInfoList',
    method: 'post',
    data
  })
}

export function getInfoById(data) {
  return request({
    url: '/index/getInfoById',
    method: 'post',
    data
  })
}


export function delInfoById(data) {
  return request({
    url: '/articleContent/delInfoById',
    method: 'post',
    data
  })
}




