import request from 'utils/axios'

const login = (email, password) => request({
  url: '/login',
  method: 'post',
  responseType: 'json',
  data: {
    email,
    password,
  },
})

const register = (
  name,
  email,
  password,
  password_confirmation,
) => request({
  url: '/register',
  method: 'post',
  responseType: 'json',
  data: {
    name,
    email,
    password,
    password_confirmation,
  },
})

const authenticatedUser = () => request({
  url: '/authenticated_user',
  method: 'get',
  responseType: 'json',
})

export default {
  login,
  register,
  authenticatedUser,
}
