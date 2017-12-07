import initialState from 'reducers/initialState'
import { LOGIN_SUCCESS, REGISTER_SUCCESS, SET_ROLE, FLUSH_AUTH } from 'constants/auth'

const auth = (state = initialState.auth, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, ...action.payload }
    case REGISTER_SUCCESS:
      return { ...state, ...action.payload }
    case SET_ROLE:
      return { ...state, ...action.payload }
    case FLUSH_AUTH:
      return {
        ...state,
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
