import initialState from 'reducers/initialState'
import {
  VERIFICATION_BROWSE_REQUEST, VERIFICATION_BROWSE_REQUEST_SUCCESS,
  VERIFICATION_BROWSE_REQUEST_ERROR, VERIFICATION_DIALOG_OPEN,
  VERIFICATION_DIALOG_CLOSE,
} from 'constants/verification'

const verification = (state = initialState.verification, action) => {
  switch (action.type) {
    case VERIFICATION_BROWSE_REQUEST:
      return {
        ...state,
        meta: {
          ...state.meta,
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
          ...state.meta,
          isLoading: false,
        },
      }
    case VERIFICATION_BROWSE_REQUEST_ERROR:
      return {
        ...state,
        meta: {
          ...state.meta,
          isLoading: false,
        },
      }
    case VERIFICATION_DIALOG_OPEN:
      return {
        ...state,
        meta: {
          ...state.meta,
          isVisible: true,
        },
      }
    case VERIFICATION_DIALOG_CLOSE:
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

export default verification
