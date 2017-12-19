import Lockr from 'lockr'
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

const logout = () => request({
  url: '/logout',
  method: 'post',
  responseType: 'json',
  headers: {
    Authorization: `Bearer ${Lockr.get('token', '')}`,
  },
})

export default {
  login,
  register,
  logout,
}
