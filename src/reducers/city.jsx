import initialState from 'reducers/initialState'
import { CITY_BROWSE_REQUEST, CITY_BROWSE_REQUEST_SUCCESS, CITY_BROWSE_REQUEST_ERROR } from 'constants/city'

const city = (state = initialState.city, action) => {
  switch (action.type) {
    case CITY_BROWSE_REQUEST:
      return {
        ...state,
        meta: {
          isLoading: true,
        },
      }
    case CITY_BROWSE_REQUEST_SUCCESS:
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
    case CITY_BROWSE_REQUEST_ERROR:
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

export default city
