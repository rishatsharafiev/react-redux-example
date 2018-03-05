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

const remove = verificationId => request({
  url: `/verification_types/${verificationId}`,
  method: 'delete',
  responseType: 'json',
})

export default {
  browse,
  add,
  remove,
}
