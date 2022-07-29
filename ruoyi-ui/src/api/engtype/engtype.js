import request from '@/utils/request'

// 查询engtype列表
export function listEngtype(query) {
  return request({
    url: '/engtype/engtype/list',
    method: 'get',
    params: query
  })
}

// 查询engtype详细
export function getEngtype(id) {
  return request({
    url: '/engtype/engtype/' + id,
    method: 'get'
  })
}

// 新增engtype
export function addEngtype(data) {
  return request({
    url: '/engtype/engtype',
    method: 'post',
    data: data
  })
}

// 修改engtype
export function updateEngtype(data) {
  return request({
    url: '/engtype/engtype',
    method: 'put',
    data: data
  })
}

// 删除engtype
export function delEngtype(id) {
  return request({
    url: '/engtype/engtype/remove?id='+id,
    method: 'post',
  })
}
export function getSame(id) {
  return request({
    url: '/engtype/engtype/getid?id='+id,
    method: 'post'
  })
}

export function getSameorderno(id) {
  return request({
    url: '/engtype/engtype/getorderNo?id='+id,
    method: 'post'
  })
}
export function up(id) {
  return request({
    url: '/engtype/engtype/up?id='+id,
    method: 'post'
  })
}
export function down(id) {
  return request({
    url: '/engtype/engtype/down?id='+id,
    method: 'post'
  })
}
export function getSon(id) {
  return request({
    url: '/engtype/engtype/getid2?id='+id,
    method: 'post'
  })
}

export function getSonorderno(id) {
  return request({
    url: '/engtype/engtype/getorderNo2?id='+id,
    method: 'post'
  })
}

export function getAllson(name) {
  return request({
    url: '/engtype/engtype//getfather?name='+name,
    method: 'post'
  })
}
