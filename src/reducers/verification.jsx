import initialState from 'reducers/initialState'
import { VERIFICATION_BROWSE_REQUEST, VERIFICATION_BROWSE_REQUEST_SUCCESS, VERIFICATION_BROWSE_REQUEST_ERROR } from 'constants/verification'

const verification = (state = initialState.verification, action) => {
  switch (action.type) {
    case VERIFICATION_BROWSE_REQUEST:
      return {
        ...state,
        meta: {
          isLoading: true,
        },
      }
    case VERIFICATION_BROWSE_REQUEST_SUCCESS:
      const {
        data,
      } = action.payload

      return {
        ...state,
        data,
        meta: {
          isLoading: false,
        },
      }
    case VERIFICATION_BROWSE_REQUEST_ERROR:
      return {
        ...state,
        meta: {
          isLoading: false,
        },
      }
    default:
      return state
  }
}

export default verification
