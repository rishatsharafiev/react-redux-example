import request from 'utils/axios'

const list = page => request({
  url: `/tasks?page=${page}`,
  method: 'get',
  responseType: 'json',
})

export default {
  list,
}
