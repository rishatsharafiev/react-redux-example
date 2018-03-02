import request from 'utils/axios'

const browse = () => request({
  url: '/violation_types',
  method: 'get',
  responseType: 'json',
})

const add = violation => request({
  url: '/violation_types',
  method: 'post',
  responseType: 'json',
  data: violation,
})

export default {
  browse,
  add,
}
