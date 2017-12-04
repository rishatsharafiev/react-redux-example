import { AUTHORIZATION } from 'constants/auth'
import initialState from 'reducers/initialState'

const auth = (state = initialState.auth, action) => {
  switch (action.type) {
    case AUTHORIZATION:
      return { ...state, token: action.payload }
    default:
      return state
  }
}

export default auth
