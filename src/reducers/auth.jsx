import {
  AUTH_SET_TOKEN,
  AUTH_SET_ROLE,
  AUTH_LOGOUT_SUCCESSFUL,
} from 'constants/auth'
import initialState from 'reducers/initialState'

const auth = (state = initialState.auth, action) => {
  switch (action.type) {
    case AUTH_SET_TOKEN:
      return { ...state, ...action.payload }
    case AUTH_SET_ROLE:
      return { ...state, ...action.payload }
    case AUTH_LOGOUT_SUCCESSFUL:
      return {
        token: '',
        user: {
          name: 'Anonymous',
          role: 'anonymous',
        },
      }
    default:
      return state
  }
}

export default auth
