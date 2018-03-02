import request from 'utils/axios'

const browse = () => request({
  url: '/verification_types',
  method: 'get',
  responseType: 'json',
})

const add = verification => request({
  url: '/verification_types',
  method: 'post',
  responseType: 'json',
  data: verification,
})

export default {
  browse,
  add,
}
