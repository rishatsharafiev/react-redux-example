import {
  LOGIN_REQUEST,
  LOGOUT,
} from 'constants/auth'

export const loginUser = ({ email, password }) => ({ type: LOGIN_REQUEST, email, password })
export const logout = () => ({ type: LOGOUT })
