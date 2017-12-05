import {
  AUTH_LOGIN_REQUESTED,
  AUTH_REGISTER_REQUESTED,
} from 'constants/auth'

export function loginUser(payload) {
  return {
    type: AUTH_LOGIN_REQUESTED,
    payload,
  }
}

export function registerUser(payload) {
  return {
    type: AUTH_REGISTER_REQUESTED,
    payload,
  }
}
