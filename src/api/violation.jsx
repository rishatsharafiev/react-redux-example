import request from 'utils/axios'

const browse = () => request({
  url: '/violation_types',
  method: 'get',
  responseType: 'json',
})

export default {
  browse,
}
