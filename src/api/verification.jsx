import request from 'utils/axios'

const browse = () => request({
  url: '/verification_types',
  method: 'get',
  responseType: 'json',
})

export default {
  browse,
}
