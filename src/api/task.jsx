import request from 'utils/axios'

const browse = page => request({
  url: `/tasks/?page=${page}`,
  method: 'get',
  responseType: 'json',
})

const read = taskId => request({
  url: `/tasks/${taskId}`,
  method: 'get',
  responseType: 'json',
})

const add = task => request({
  url: '/tasks',
  method: 'post',
  responseType: 'json',
  data: task,
})

const edit = (taskId, task) => request({
  url: `/tasks/${taskId}`,
  method: 'patch',
  responseType: 'json',
  data: task,
})

export default {
  browse,
  read,
  add,
  edit,
}
