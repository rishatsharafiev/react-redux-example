import {
  LOGIN_REQUEST,
  REGISTER_REQUEST,
  LOGOUT,
} from 'constants/auth'

export const loginUser = ({ email, password }) => ({ type: LOGIN_REQUEST, email, password })
export const registerUser = ({
  name, email, password, password_confirmation,
}) => ({
  type: REGISTER_REQUEST, name, email, password, password_confirmation,
})
export const logout = () => ({ type: LOGOUT })
