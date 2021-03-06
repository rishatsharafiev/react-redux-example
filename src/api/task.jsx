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

const status = (taskId, statusValue) => request({
  url: `/tasks/${taskId}/status`,
  method: 'patch',
  responseType: 'json',
  data: {
    status: statusValue,
  },
})


export default {
  browse,
  read,
  add,
  edit,
  status,
}
