import Lockr from 'lockr'
import constants from 'constants/auth'
import api from 'api/auth'

export function loginUser(payload) {
  return (dispatch) => {
    api.login(payload, (response) => {
      const token = response.data.token ? `Bearer ${response.data.token}` : null
      if (token) {
        Lockr.set('Authorization', token)
        dispatch({
          type: constants.LOGIN_USER,
          payload: {

          },
          error: false,
        })
      }
    }, (error) => {
      dispatch({
        type: constants.LOGIN_USER,
        payload: error,
        error: true,
      })
    })
  }
}

export function registerUser(payload) {
  return (dispatch) => {
    api.register(payload, (response) => {
      const token = response.data.token ? `Bearer ${response.data.token}` : null
      if (token) {
        Lockr.set('Authorization', token)
        dispatch({
          type: constants.REGISTER_USER,
          payload: {

          },
          error: false,
        })
      }
    }, (error) => {
      dispatch({
        type: constants.REGISTER_USER,
        payload: error,
        error: true,
      })
    })
  }
}


export default {
  loginUser,
  registerUser,
}
