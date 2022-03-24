import service from '@/utils/request'

// 根据 id 查询目录
export function getCatalog(id) {
  return service.get('/catalog', {
      params:{
          id: id
      }
  })
}

// 根据 id 和 page信息 查询目录
export function findByIdAndPage(id, pageInfo) {
  return service({
    url: '/catalog/findByIdAndPage', 
    method: 'post',
    params: {
      id: id 
    },
    data: pageInfo
  })
}

// 根据 id 和 search content  和 page 查询目录
export function findByItems(id, item, content, pageInfo) {
  return service({
    url: 'catalog/findByItems',
    method: 'post',
    params:{
      id: id,
      item: item,
      content: content, 
    },
    data: pageInfo
  })
}

// 新建文件夹
export function createCatalog(data) {
  console.log('createCatalog: ', data)
  return service.post('/catalog', data)
}

// 删除文件夹
export function deleteFolder(data) {
  return service.delete('/catalog', {params: data})
}
