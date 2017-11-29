import request from 'utils/axios'

const login = (data, onSuccess, onError) => {
  request({
    url: '/login',
    method: 'post',
    responseType: 'json',
    data,
  }, onSuccess, onError)
}

const register = (data, onSuccess, onError) => {
  request({
    url: '/register',
    method: 'post',
    responseType: 'json',
    data,
  }, onSuccess, onError)
}

export default {
  login,
  register,
}
