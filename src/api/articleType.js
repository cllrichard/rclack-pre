import request from '@/utils/request'

export function saveArticleTypeInfo(data) {
  return request({
    url: '/article/saveArticleTypeInfo',
    method: 'post',
    data
  })
}


export function getArticleTypeInfo(data) {
    return request({
      url: '/article/getArticleTypeInfo',
      method: 'post',
      data
    })
}


export function delArticleTypeInfo(data) {
  return request({
    url: '/article/delArticleTypeInfo',
    method: 'post',
    data
  })
}


export function updArticleTypeInfo(data) {
  return request({
    url: '/article/updArticleTypeInfo',
    method: 'post',
    data
  })
}



export function getArticleTypeInfoWithCount(data) {
  return request({
    url: '/index/getArticleTypeInfoWithCount',
    method: 'post',
    data
  })
}
