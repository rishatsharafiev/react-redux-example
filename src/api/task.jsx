import request from 'utils/axios'

const browse = page => request({
  url: `/tasks/?page=${page}`,
  method: 'get',
  responseType: 'json',
})

export default {
  browse,
}
