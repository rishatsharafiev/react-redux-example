import Lockr from 'lockr'
import { SubmissionError } from 'redux-form'
import constants from 'constants/auth'
import api from 'api/auth'

export function setAuthorization() {
  return {
    type: constants.AUTHORIZATION,
    payload: Lockr.get('Authorization', null),
  }
}

export function loginUser(payload) {
  return dispatch => api.login(payload, (response) => {
    const token = response.data.token ? `Bearer ${response.data.token}` : null
    if (token) {
      Lockr.set('Authorization', token)
      dispatch({
        type: constants.LOGIN_USER,
        payload: {},
        error: false,
      })
    }
  }, (error) => {
    throw new SubmissionError({ _error: error.response.data.message })
  })
}

export function registerUser(payload) {
  return dispatch => api.register(payload, (response) => {
    const token = response.data.token ? `Bearer ${response.data.token}` : null
    if (token) {
      Lockr.set('Authorization', token)
      dispatch({
        type: constants.REGISTER_USER,
        payload: {},
        error: false,
      })
    }
  }, (error) => {
    throw new SubmissionError({ _error: error.response.data.errors })
  })
}

export default {
  setAuthorization,
  loginUser,
  registerUser,
}
