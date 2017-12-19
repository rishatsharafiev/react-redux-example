import {
  LOGIN_REQUEST,
  REGISTER_REQUEST,
  LOGOUT_INIT,
} from 'constants/auth'

export const loginUser = ({ email, password }) => ({
  type: LOGIN_REQUEST, payload: { email, password },
})

export const registerUser = ({
  name, email, password, password_confirmation,
}) => ({
  type: REGISTER_REQUEST,
  payload: {
    name, email, password, password_confirmation,
  },
})

export const logout = () => ({ type: LOGOUT_INIT })
