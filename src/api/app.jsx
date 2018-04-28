import request from 'utils/axios'

const authenticatedUser = () => request({
  url: '/authenticated_user',
  method: 'get',
  responseType: 'json',
})

export default {
  authenticatedUser,
}
