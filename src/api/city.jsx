import request from 'utils/axios'

const browse = () => request({
  url: '/cities',
  method: 'get',
  responseType: 'json',
})

export default {
  browse,
}
