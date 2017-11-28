import request from 'utils/axios'
import Lockr from 'lockr'

const authenticate = (data, onSuccess, onError) => {
  const headers = {
    Authorization: Lockr.get('Authorization', null),
  }

  request({
    url: '/authenticate',
    method: 'post',
    responseType: 'json',
    data,
    headers,
  }, onSuccess, onError)
}

export default {
  authenticate,
}
