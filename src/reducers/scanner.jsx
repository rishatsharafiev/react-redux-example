import initialState from 'reducers/initialState'
import { SCANNER_READY, SCANNER_RESULT, SCANNER_ERROR } from 'constants/scanner'

const scanner = (state = initialState.scanner, action) => {
  switch (action.type) {
    case SCANNER_READY:
      return { ...state, ...action.payload }
    case SCANNER_RESULT:
      return { ...state, ...action.payload }
    case SCANNER_ERROR:
      return { ...state, ...action.payload }
    default:
      return state
  }
}

export default scanner
