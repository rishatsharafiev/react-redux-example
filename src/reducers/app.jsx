import initialState from 'reducers/initialState'
import { ROLE_REQUEST_SUCCESS } from 'constants/app'
import { LOGOUT_REQUEST } from 'constants/auth'

const app = (state = initialState.app, action) => {
  switch (action.type) {
    case ROLE_REQUEST_SUCCESS:
      return { ...state, ...action.payload }
    case LOGOUT_REQUEST:
      return {
        ...state,
        user: {
          name: 'Guest',
          role: 'guest',
        },
      }
    default:
      return state
  }
}

export default app
