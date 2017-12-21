import initialState from 'reducers/initialState'
import { LOGOUT_REQUEST } from 'constants/auth'
import { TOKEN_FILLED } from 'constants/app'

const auth = (state = initialState.auth, action) => {
  switch (action.type) {
    case TOKEN_FILLED:
      return { ...state, ...action.payload }
    case LOGOUT_REQUEST:
      return { ...state, token: '' }
    default:
      return state
  }
}

export default auth
