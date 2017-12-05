import request from 'utils/axios'

const login = data => request({
  url: '/login',
  method: 'post',
  responseType: 'json',
  data,
})

const register = data => request({
  url: '/register',
  method: 'post',
  responseType: 'json',
  data,
})

const authenticatedUser = data => request({
  url: '/authenticated_user',
  method: 'get',
  responseType: 'json',
  data,
})

export default {
  login,
  register,
  authenticatedUser,
}
