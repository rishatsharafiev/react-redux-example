import initialState from 'reducers/initialState'
import { SHOP_BROWSE_REQUEST, SHOP_BROWSE_REQUEST_SUCCESS, SHOP_BROWSE_REQUEST_ERROR } from 'constants/shop'

const shop = (state = initialState.shop, action) => {
  switch (action.type) {
    case SHOP_BROWSE_REQUEST:
      return {
        ...state,
        meta: {
          isLoading: true,
        },
      }
    case SHOP_BROWSE_REQUEST_SUCCESS:
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
    case SHOP_BROWSE_REQUEST_ERROR:
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

export default shop
