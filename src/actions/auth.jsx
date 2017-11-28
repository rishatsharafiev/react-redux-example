import constants from 'constants/auth'
import request from 'utils/axios'
import Lockr from 'lockr'

export function loginUser(payload) {
  const headers = {
    Authorization: Lockr.get('Authorization', null),
  }

  return (dispatch) => {
    request({
      url: '/authenticate',
      method: 'post',
      responseType: 'json',
      data: payload,
      headers,
    }, (response) => {
      if (response.data.token) {
        Lockr.set('Authorization', `Bearer ${response.data.token}`)
        dispatch({
          type: constants.LOGIN_USER,
          payload,
          error: false,
        })
      }
    }, (error) => {
      dispatch({
        type: constants.LOGIN_USER,
        payload: error,
        error: false,
      })
    })
  }
}

export default {
  loginUser,
}
