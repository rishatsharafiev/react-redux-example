import initialState from 'reducers/initialState'
import {
  VIOLATION_BROWSE_REQUEST, VIOLATION_BROWSE_REQUEST_SUCCESS,
  VIOLATION_BROWSE_REQUEST_ERROR, VIOLATION_DIALOG_OPEN,
  VIOLATION_DIALOG_CLOSE,
} from 'constants/violation'

const violation = (state = initialState.violation, action) => {
  switch (action.type) {
    case VIOLATION_BROWSE_REQUEST:
      return {
        ...state,
        meta: {
          ...state.meta,
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
          ...state.meta,
          isLoading: false,
        },
      }
    case VIOLATION_BROWSE_REQUEST_ERROR:
      return {
        ...state,
        meta: {
          ...state.meta,
          isLoading: false,
        },
      }
    case VIOLATION_DIALOG_OPEN:
      return {
        ...state,
        meta: {
          ...state.meta,
          isVisible: true,
        },
      }
    case VIOLATION_DIALOG_CLOSE:
      return {
        ...state,
        meta: {
          ...state.meta,
          isVisible: false,
        },
      }
    default:
      return state
  }
}

export default violation
