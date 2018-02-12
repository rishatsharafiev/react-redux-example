import request from 'utils/axios'

const browse = page => request({
  url: `/tasks/?page=${page}`,
  method: 'get',
  responseType: 'json',
})

const add = task => request({
  url: '/tasks',
  method: 'post',
  responseType: 'json',
  data: task,
})

export default {
  browse,
  add,
}
