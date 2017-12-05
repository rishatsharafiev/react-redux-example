import {
  AUTH_LOGIN_REQUESTED,
  AUTH_REGISTER_REQUESTED,
  AUTH_SET_TOKEN,
  AUTH_SET_ROLE,
  AUTH_LOGOUT,
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

export function setToken(payload) {
  return {
    type: AUTH_SET_TOKEN,
    payload,
  }
}

export function setRole(payload) {
  return {
    type: AUTH_SET_ROLE,
    payload,
  }
}

export function logout() {
  return {
    type: AUTH_LOGOUT,
  }
}
