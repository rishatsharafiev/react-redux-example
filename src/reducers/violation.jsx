import initialState from 'reducers/initialState'
import { VIOLATION_BROWSE_REQUEST, VIOLATION_BROWSE_REQUEST_SUCCESS, VIOLATION_BROWSE_REQUEST_ERROR } from 'constants/violation'

const violation = (state = initialState.violation, action) => {
  switch (action.type) {
    case VIOLATION_BROWSE_REQUEST:
      return {
        ...state,
        meta: {
          isLoading: true,
        },
      }
    case VIOLATION_BROWSE_REQUEST_SUCCESS:
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
    case VIOLATION_BROWSE_REQUEST_ERROR:
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

export default violation
