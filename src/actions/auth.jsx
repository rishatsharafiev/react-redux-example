import Lockr from 'lockr'
import constants from 'constants/auth'
import api from 'api/auth'

export function loginUser(payload) {
  return (dispatch) => {
    api.authenticate(payload, (response) => {
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
        error: true,
      })
    })
  }
}

export default {
  loginUser,
}
