import Lockr from 'lockr'
import { SubmissionError } from 'redux-form'
import routerHistory from 'utils/history'
import { AUTHORIZATION } from 'constants/auth'
import api from 'api/auth'

export function loginUser(payload) {
  return async (dispatch) => {
    try {
      const response = await api.login(payload)
      const token = response.data.token ? `Bearer ${response.data.token}` : ''
      if (token) {
        Lockr.set('Authorization', token)
        dispatch({ type: AUTHORIZATION, payload: Lockr.get('Authorization', '') })
        routerHistory.push('/')
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
        dispatch({ type: AUTHORIZATION, payload: Lockr.get('Authorization', '') })
        routerHistory.push('/')
      }
    } catch (error) {
      throw new SubmissionError({ _error: error.response.data.message })
    }
  }
}
