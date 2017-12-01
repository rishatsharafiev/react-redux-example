import Lockr from 'lockr'
import { SubmissionError } from 'redux-form'
import history from 'utils/history'
import constants from 'constants/auth'
import api from 'api/auth'

export function isLoggedIn() {
  return {
    type: null,
    loggedIn: Lockr.get('Authorization', ''),
  }
}

export function loginUser(payload) {
  return async (dispatch) => {
    try {
      const response = await api.login(payload)
      const token = response.data.token ? `Bearer ${response.data.token}` : ''
      if (token) {
        Lockr.set('Authorization', token)
        dispatch({ type: constants.AUTHORIZATION, payload: Lockr.get('Authorization', '') })
        history.push('/')
      }
    } catch (error) {
      throw new SubmissionError({ _error: error.response.data.message })
    }
  }
}

export function registerUser(payload) {
  return async (dispatch) => {
    try {
      const response = await api.register(payload)
      const token = response.data.token ? `Bearer ${response.data.token}` : ''
      if (token) {
        Lockr.set('Authorization', token)
        dispatch({ type: constants.AUTHORIZATION, payload: Lockr.get('Authorization', '') })
        history.push('/')
      }
    } catch (error) {
      throw new SubmissionError({ _error: error.response.data.message })
    }
  }
}

export default {
  isLoggedIn,
  loginUser,
  registerUser,
}
