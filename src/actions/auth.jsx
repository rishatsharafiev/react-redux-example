import {
  LOGIN_REQUEST,
  REGISTER_REQUEST,
  LOGOUT_REQUEST,
} from 'constants/auth'

export const login = ({ email, password }) => ({
  type: LOGIN_REQUEST, payload: { email, password },
})

export const register = ({
  name, email, password, password_confirmation,
}) => ({
  type: REGISTER_REQUEST,
  payload: {
    name, email, password, password_confirmation,
  },
})

export const logout = () => ({ type: LOGOUT_REQUEST })
